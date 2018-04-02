import GameTile from "./GameTile.js";
import {isCheckOrMate, validDropLocations} from "./boardHelpers.js";
import eloRank from 'elo-rank';

export const test = () => {
  let testBoard, testKings, testHands, testTile, result;
  const passed = () => console.log("<<<Test Passed>>>");
  const failed = (data) => console.log("***Test Failed***", data);

  testBoard = [
    ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
    [" ", "R", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: []};
  testTile = new GameTile("Pawn", "white", [6, 8]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log('should not find check or checkmate on a new board');
  if (!result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [["L", "N", "S", "G", "K", "G", "S", "N", "L"], [" ", "R", " ", " ", " ", " ", " ", "B", " "], ["P", "P", "P", "P", " ", "P", "P", "P", "P"], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], ["p", "p", "p", "p", " ", "p", "p", "p", "p"], [" ", "b", " ", " ", "r", " ", " ", " ", " "], ["l", "n", "s", "g", "k", "g", "s", "n", "l"]];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
  console.log("should correctly recognize check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [["L", "N", "r", " ", "K", "G", "S", "N", "L"], [" ", "R", " ", " ", " ", " ", " ", "B", " "], ["P", "P", "P", "P", "P", "P", "P", "P", "P"], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], ["p", "p", "p", "p", "p", "p", "p", "p", "p"], [" ", "b", " ", " ", " ", " ", " ", " ", " "], ["l", "n", "s", "g", "k", "g", "s", "n", "l"]];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [10, 10]);
  result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
  console.log("should recognize check from a drop");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", " ", "K", " ", "S", "N", "L"],
    [" ", " ", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", " ", " ", " ", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: []};
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze the king can move out of check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", "P", "R", "S", " ", "B", " "],
    ["P", "P", "P", "n", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: []};
  testTile = new GameTile("Knight", "white", [2, 3]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze the capture to get out of check");
  if (result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: ["B"]};
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should know that a dropped piece will get out of check");
  if (result[0] && !result[1] && ! result[2]) {
    passed();
  } else {
    failed(result);
  }

   testBoard = [
     [" ", " ", " ", " ", " ", " ", " ", " ", " "],
     [" ", " ", " ", " ", " ", " ", " ", " ", " "],
     [" ", " ", " ", "P", " ", "P", " ", " ", " "],
     [" ", " ", " ", "P", "K", "P", " ", " ", " "],
     [" ", " ", " ", "P", " ", "P", " ", " ", " "],
     [" ", " ", " ", " ", " ", " ", " ", " ", " "],
     [" ", " ", " ", " ", " ", " ", " ", " ", " "],
     [" ", " ", " ", " ", "r", " ", " ", " ", " "],
     [" ", " ", " ", " ", "k", " ", " ", " ", " "]];
   testKings = { white: [8, 4], black: [5, 4] };
   testHands = { white: [], black: [] };
   testTile = new GameTile("Rook", "white", [7, 4]);
   result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
   console.log("should know moving away from a dynamic piece will not get out of check");
   if (result[0] && result[1] && !result[2]) {
     passed();
   } else {
     failed(result);
   }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "l", "r", "l", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: []};
  testTile = new GameTile("Rook", "white", [5, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze checkmate");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Gold", "white", [1, 4]);
  result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
  console.log("should recognize the king cannot put himself in check to get out of check");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", " ", " ", "S", " ", "B", " "],
    ["P", " ", "b", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "P", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "p", " ", " ", " ", " ", " ", " "],
    ["p", "p", " ", "p", " ", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = {white: [8, 4], black: [8, 4]};
  testHands = {white: [], black: []};
  testTile = new GameTile("Bishop", "white", [2, 2]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze fool's mate");
  if (result[0] && result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [["K", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", "r"], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", "r", " ", " ", "k", " ", " ", " ", " "]];
  testKings = { white: [8, 4], black: [8, 8] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [1, 8]);
  result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
  console.log("should recognize lock");
  if (!result[0] && !result[1] && result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [["K", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", "r"], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", "r", " ", " ", "k", " ", " ", " ", " "]];
  testKings = { white: [8, 4], black: [8, 8] };
  testHands = { white: [], black: ["P"] };
  testTile = new GameTile("Rook", "white", [1, 8]);
  result = isCheckOrMate({ board: testBoard, kings: testKings, white: testHands.white, black: testHands.black }, testTile);
  console.log("should recognize not lock");
  if (!result[0] && !result[1] && !result[2]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", "R", "K", "R", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", " ", "s", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "n", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    ["p", "p", "p", "p", "l", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ['p'], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn causing checkmate");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn in column with another pawn");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [[" ", " ", " ", " ", "K", " ", " ", " ", " "], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "k", "l", "l", "l", "l"]];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn in last row");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [[" ", " ", " ", " ", "K", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " "], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "b", "l", "l", "l", "l"], ["l", "l", "l", "l", "k", "l", "l", "l", "l"]];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["n"], black: [] };
  testTile = new GameTile("Knight", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop knight in last 2 rows");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  // const elo = new eloRank(32);

  // let user1 = 1000;
  // let user2 = 1000;
  // let user3 = 500;
  // let user4 = 500;
  // let user5 = 1500;
  // let user6 = 1500;

  // let expected1, expected2, final1, final2;

  // expected1 = elo.getExpected(user1, user2);
  // expected2 = elo.getExpected(user2, user1);
  // final1 = elo.updateRating(expected1, 1, user1);
  // final2 = elo.updateRating(expected2, 0, user2);
  // console.log(user1, expected1, final1);
  // console.log(user2, expected2, final2);

  // expected1 = elo.getExpected(user1, user2);
  // expected2 = elo.getExpected(user2, user1);
  // final1 = elo.updateRating(expected1, 0.5, user1);
  // final2 = elo.updateRating(expected2, 0.5, user2);
  // console.log(user1, expected1, final1);
  // console.log(user2, expected2, final2);

  // expected1 = elo.getExpected(user3, user4);
  // expected2 = elo.getExpected(user4, user3);
  // final1 = elo.updateRating(expected1, 1, user3);
  // final2 = elo.updateRating(expected2, 0, user4);
  // console.log(user3, expected1, final1);
  // console.log(user4, expected2, final2);

  // expected1 = elo.getExpected(user3, user4);
  // expected2 = elo.getExpected(user4, user3);
  // final1 = elo.updateRating(expected1, 0.5, user3);
  // final2 = elo.updateRating(expected2, 0.5, user4);
  // console.log(user3, expected1, final1);
  // console.log(user4, expected2, final2);

}
// const north = () => {}
// const south = () => {}
// const east = () => {}
// const west = () => {}
// const onBoard = (position) => {}
// const hitFriendly = () => {}
// const hitEnemy = () => {}

// let result = [];
// for (let i = 1; i < boardSize; i++) {
//   if (onBoard(i, _test) && this.hitFriendly(i), this.hitEnemy(i)) {

//   }
// }

// GameTile.prototype._rookMoves = function(board, _test) {
//   let result = [];
//   for (let i = 1; i < boardSize; i++) {
//     let position = [this.loc[0] - i, this.loc[1]];
//     if (position[0] < 0 || position[0] === boardSize) {
//       break;
//     } else {
//       if (board[position[0]][position[1]] !== " ") {
//         if (
//           !_test &&
//           ((board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white") ||
//             (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//               this.color === "black"))
//         ) {
//           break;
//         } else if (
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "black" &&
//             !(_test && board[position[0]][position[1]] === "k")) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "white" &&
//             !(_test && board[position[0]][position[1]] === "K")) ||
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white" &&
//             _test) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "black" &&
//             _test)
//         ) {
//           result.push([-i, 0]);
//           break;
//         }
//       } else {
//         result.push([-i, 0]);
//       }
//     }
//   }
//   for (let i = 1; i < boardSize; i++) {
//     let position = [this.loc[0] + i, this.loc[1]];
//     if (position[0] < 0 || position[0] === boardSize) {
//       break;
//     } else {
//       if (board[position[0]][position[1]] !== " ") {
//         if (
//           !_test &&
//           ((board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white") ||
//             (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//               this.color === "black"))
//         ) {
//           break;
//         } else if (
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "black" &&
//             !(_test && board[position[0]][position[1]] === "k")) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "white" &&
//             !(_test && board[position[0]][position[1]] === "K")) ||
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white" &&
//             _test) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "black" &&
//             _test)
//         ) {
//           result.push([i, 0]);
//           break;
//         }
//       } else {
//         result.push([i, 0]);
//       }
//     }
//   }
//   for (let i = 1; i < boardSize; i++) {
//     let position = [this.loc[0], this.loc[1] - i];
//     if (position[1] < 0 || position[1] === boardSize) {
//       break;
//     } else {
//       if (board[position[0]][position[1]] !== " ") {
//         if (
//           !_test &&
//           ((board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white") ||
//             (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//               this.color === "black"))
//         ) {
//           break;
//         } else if (
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "black" &&
//             !(_test && board[position[0]][position[1]] === "k")) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "white" &&
//             !(_test && board[position[0]][position[1]] === "K")) ||
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white" &&
//             _test) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "black" &&
//             _test)
//         ) {
//           result.push([0, -i]);
//           break;
//         }
//       } else {
//         result.push([0, -i]);
//       }
//     }
//   }
//   for (let i = 1; i < boardSize; i++) {
//     let position = [this.loc[0], this.loc[1] + i];
//     if (position[1] < 0 || position[1] === boardSize) {
//       break;
//     } else {
//       if (board[position[0]][position[1]] !== " ") {
//         if (
//           !_test &&
//           ((board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white") ||
//             (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//               this.color === "black"))
//         ) {
//           break;
//         } else if (
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "black" &&
//             !(_test && board[position[0]][position[1]] === "k")) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "white" &&
//             !(_test && board[position[0]][position[1]] === "K")) ||
//           (board[position[0]][position[1]].charCodeAt(0) > 90 &&
//             this.color === "white" &&
//             _test) ||
//           (board[position[0]][position[1]].charCodeAt(0) < 91 &&
//             this.color === "black" &&
//             _test)
//         ) {
//           result.push([0, i]);
//           break;
//         }
//       } else {
//         result.push([0, i]);
//       }
//     }
//   }
//   return result;
// };
