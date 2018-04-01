import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import { createMatchHelper, fetchMatchHelper, fetchOpponentHelper, updateMatchHelper, endMatchHelper, historyMatchHelper } from "./matchesSQL";

export const createMatchQuery = async body => {
  try {
    const queryString = createMatchHelper(body);
    const data = await db.query(queryString);
    success(
      "createMatchQuery - successfully saved match",
      JSON.stringify(data)
    );
    return data.filter(result => result.rows.length).map(result => result.rows[0]);
  } catch (err) {
    error("createMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchMatchQuery = async query => {
  try {
    const queryString = fetchMatchHelper(query);
    const data = await db.queryAsync(queryString);
    success("fetchMatchQuery - successfully fetched match ");
    if (query.userId) {
      let opponents = data.rows.map(match => {
        return match.black !== +query.userId ? match.black : match.white;
      });
      const opponentsQueryString = fetchOpponentHelper(opponents);
      opponents.length ? opponents = await db.queryAsync(opponentsQueryString) : null;
      return {matches: data.rows, opponents: opponents.rows};
    } else if (query.black && query.white) {
      return data.filter(data => data.rows.length).map(data => data.rows[0]);
    }
    return data.rows;
  } catch (err) {
    error("fetchMatchQuery - error=", err);
  }
};

export const updateMatchQuery = async body => {
  try {
    const queryString = updateMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "updateMatchQuery - successfully updated match",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const endMatchQuery = async ({ matchId, status, winner, loser }) => {
  try {
    winner = JSON.parse(winner);
    loser = JSON.parse(loser);
    const queryString = endMatchHelper({ matchId, status, winner, loser });
    const data = await db.query(queryString);
    success(
      "endMatchQuery - match data: ",
      JSON.stringify(data)
    );
    return data;
  } catch (err) {
    error("endMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const historyMatchQuery = async body => {
  try {
    const queryString = historyMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "historyMatchQuery - successfully grabbed match history",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("historyMatchQuery - error= ", err);
    throw new Error(err);
  }
};
