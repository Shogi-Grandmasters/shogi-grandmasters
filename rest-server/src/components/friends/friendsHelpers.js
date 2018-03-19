import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { addFriendHelper, fetchAllFriendsHelper, delFriendHelper } from './friendsSQL';

export const addFriendQuery = async body => {
  try {
    const queryString = await addFriendHelper(body);
    const data = await db.queryAsync(queryString);
    success("friendsQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("friendsQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchFriendQuery = async body => {
  try {
    const queryString = await fetchAllFriendsHelper(body);
    const data = await db.queryAsync(queryString);
    success("friendsQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("friendsQuery - error= ", err);
    throw new Error(err);
  }
};

export const delFriendQuery = async body => {
  try {
    const queryString = await delFriendHelper(body);
    const data = await db.queryAsync(queryString);
    success("delFriendQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("delFriendQuery - error= ", err);
    throw new Error(err);
  }
};