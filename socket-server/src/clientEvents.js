import axios from "axios";
import randomstring from "randomstring";

import { boardIds } from "./lib/constants";
import {
  isValidMove,
  isCheckOrMate,
  reverseBoard,
  pieceNameFromBoardId
} from "./lib/boardHelpers";
import { endMatch } from "./lib/ratingHelpers";
import { moveToString } from "./lib/matchLog";
import GameTile from "./lib/GameTile";
import { success, log, error } from "./lib/log";
import { Queue, findOpponent } from "./lib/matchHelpers";
import { initialBoard } from "./lib/constants";
import {
  serverJoinMatch,
  serverChanged,
  serverLeave,
  serverLoadMessages,
  serverGameReady,
  serverSendMessages,
  serverSendPopupMessages,
  serverHomeChat,
  serverPopupChat,
  serverUpdateGames,
  serverPlayerMove,
  serverConcludeMatch,
  serverChallengeSent,
  serverChallengeAccepted,
  serverChallengeRejected
} from "./serverEvents";

const { REST_SERVER_URL } = process.env;

const unrankedQueue = new Queue();
const rankedQueue = new Queue();

const clientJoinQueue = async ({ io, client, room }, { userId, rating, ranked }) => {
  success("client join queue heard");
  try {
    const queue = ranked ? rankedQueue : unrankedQueue;
    if (queue.size()) {
      const matchedOpponent = findOpponent(queue, [+userId, rating]);
      if (matchedOpponent) {
        const matchId = randomstring.generate();
        const type = ranked ? 1 : 0;
        let black, white;
        queue.pluck(matchedOpponent[0]);
        matchedOpponent[1] >= rating
          ? (black = matchedOpponent[0], white = userId)
          : (black = userId, white = matchedOpponent[0]);
        await clientGameReady({ io, client, room }, { matchId, black, white, type });
        serverJoinMatch({ io, client, room }, { matchId, black, white });
      } else {
        queue.enqueue([+userId, rating]);
      }
    } else {
      queue.enqueue([+userId, rating]);
    }
  } catch (err) {
    error("client join queue error", err);
  }
};

const clientLeaveQueue = ({ io, client, room }, { userId, ranked }) => {
  success("client leave queue heard");
  try {
    const queue = ranked ? rankedQueue : unrankedQueue;
    queue.pluck(+userId);
  } catch (err) {
    error("client leave queue error", err);
  }
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  success("client update heard. payload.text = ", payload);
  room.set("text", text);
  room.set("email", email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, client, room }) => {
  success("client disconnected");
  serverLeave({ io, client, room });
};

const clientFetchMessages = async ({ io, client, room }, payload) => {
  success("client load message request heard");
  try {
    const { userId, friendId } = payload;
    const { data } = await axios.get(`${REST_SERVER_URL}/api/messages`, {
        params: { userId, friendId }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (userId) {
      serverSendPopupMessages({ io, client, room }, data);
    } else {
      serverSendMessages({ io, client, room }, data);
    }
  } catch (err) {
    error("error fetching messages from database. e = ", err);
  }
};

const clientHomeChat = async ({ io, client, room }, payload) => {
  success("client home chat heard");
  try {
    const { content, user_id, friend_id } = payload;
    await axios.post(`${REST_SERVER_URL}/api/messages`, {
      matchId: room.get("id"),
      message: content,
      userId: user_id,
      friendId: friend_id,
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
    );
    if (user_id === friend_id) {
      serverHomeChat({ io, client, room }, payload);
    } else {
      serverPopupChat({ io, client, room }, payload);
    }
  } catch (err) {
    error("client home chat error: ", err);
  }
};

const clientPopupChat = async ({ io, client, room }, payload) => {
  success("client game chat heard");
  try {
    serverPopupChat({ io, client, room }, payload);
  } catch (err) {
    error("client game chat error: ", err);
  }
};

const clientGameReady = async ({ io, client, room }, payload) => {
  success("client opponent joined");
  try {
    let { matchId, black, white, type } = payload;
    let result = await axios.get(`${REST_SERVER_URL}/api/matches`, {
        params: { matchId, black, white }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (result.data.length <  3) {
      result = await axios.post(`${REST_SERVER_URL}/api/matches`, {
        matchId,
        board: JSON.stringify(initialBoard),
        black,
        white,
        hand_white: "[]",
        hand_black: "[]",
        type
      },
      {
        headers: { 'Content-Type': 'application/json' }
      });
      room.set("black", result.data[1].id);
      room.set("white", result.data[2].id);
    }
    serverGameReady({ io, client, room }, result.data);
  } catch (err) {
    error("error creating game. e = ", err);
  }
};

const clientListGames = async ({ io, client, room }) => {
  success("list open games");
  serverUpdateGames({ io, client, room });
};

const clientEndGame = async ({ io, client, room }, payload) => {
  try {
    let { matchId, winner, loser, status, type } = payload;
    let ratingType = type === 0 ? 'unranked' : type === 1 ? 'ranked' : 'friendly';
    if (ratingType === 'unranked') [winner.rating_unranked, loser.rating_unranked] = endMatch([winner.rating_unranked, loser.rating_unranked]);
    if (ratingType === 'ranked') [winner.rating_ranked, loser.rating_ranked] = endMatch([winner.rating_ranked, loser.rating_ranked]);
    // todo:  update leaderboards
    await axios.post(`${REST_SERVER_URL}/api/matches/end`, {
      matchId,
      status,
      winner: JSON.stringify(winner),
      loser: JSON.stringify(loser)
    },
    {
      headers: { 'Content-Type': 'application/json' }
    });
    serverConcludeMatch({ io, client, room}, { winner, loser, status });
  } catch (err) {
    error('issue ending match, e = ', err);
  }
};

const clientSubmitMove = async ({ io, client, room }, payload) => {
  try {
    let { matchId, before, after, move } = payload;
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches`, {
      params: { matchId }
    },
    {
      headers: { 'Content-Type': 'application/json' }
    });
    // validation
    data = data[0];
    let messages = [];
    // turn and user match
    let correctTurn =
      (data.turn === 1 && move.color === "black") ||
      (data.turn === 0 && move.color === "white");
    if (!correctTurn)
      messages.push("Move submitted was not for the correct turn.");
    // move is valid
    let [validMove, moveError] = isValidMove(before, after, new GameTile(pieceNameFromBoardId(move.piece), move.color, move.from, move.piece.length > 1), move.to);
    if (!validMove) messages.push(moveError);
    // board state is check or checkmate
    let [check, checkmate] = isCheckOrMate(after, move.color);
    let gameStatus = data.status || 0;
    // save new state if the move was successful
    let success = correctTurn && validMove;
    // orient board to default
    let savedBoard =
      move.color === "black" ? reverseBoard(after.board) : after.board;
    // prep event log
    let eventLog = data.event_log || [];
    let event = {
      moveNumber: eventLog.length + 1,
      notation: moveToString(move),
      move,
      check,
      checkmate
    };
    eventLog.unshift(event);
    await axios.put(`${REST_SERVER_URL}/api/matches`, {
      matchId,
      board: JSON.stringify(savedBoard),
      status: gameStatus,
      turn: data.turn ? 0 : 1,
      hand_white: JSON.stringify(after.white),
      hand_black: JSON.stringify(after.black),
      event_log: JSON.stringify(eventLog)
    },
    {
      headers: { 'Content-Type': 'application/json' }
    });
    payload.log = eventLog;
    payload.status = {
      success,
      check,
      checkmate,
      messages
    };
    // broadcast move
    serverPlayerMove({ io, client, room }, payload);
  } catch (err) {
    error("issue validating player move, e = ", err);
  }
};

const clientChallengeFriend = async ({ io, client, room }, payload) => {
  success("client challenge friend heard");
  try {
    const { data } = await axios.post(
      `${REST_SERVER_URL}/api/openMatches`,
      payload
    );
    payload.id = data.id;
    serverChallengeSent({ io, client, room }, payload);
  } catch (err) {
    error("client leave queue error", err);
  }
};

const clientAcceptChallenge = async ({ io, client, room }, payload) => {
  success("client accept challenge heard");
  try {
    await clientGameReady({ io, client, room }, payload);
    serverChallengeAccepted({ io, client, room }, payload);
  } catch (err) {
    error("client accept challenge error", err);
  }
};

const clientRejectChallenge = async ({ io, client, room }, payload) => {
  success("client reject challenge heard");
  try {
    serverChallengeRejected({ io, client, room }, payload);
  } catch (err) {
    error("client reject challenge error", err);
  }
};

const clientEmitters = {
  "client.joinQueue": clientJoinQueue,
  "client.leaveQueue": clientLeaveQueue,
  "client.update": clientUpdate,
  "client.disconnect": clientDisconnect,
  "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.homeChat": clientHomeChat,
  "client.popupChat": clientPopupChat,
  "client.listOpenGames": clientListGames,
  "client.submitMove": clientSubmitMove,
  "client.challengeFriend": clientChallengeFriend,
  "client.acceptChallenge": clientAcceptChallenge,
  "client.rejectChallenge": clientRejectChallenge,
  "client.endGame": clientEndGame
};

export default clientEmitters;
