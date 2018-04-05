import { addFriendQuery, fetchFriendQuery, delFriendQuery, updateFriendQuery } from './friendsHelpers';
import { success, error } from "../../lib/log";

export const addFriendController = async (req, res) => {
  try {
    const data = await addFriendQuery(req.body);
    success("addFriendController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error("addFriendController - error= ", err);
    return res.status(400).send(err);
  }
};

export const fetchFriendController = async (req, res) => {
  try {
    const data = await fetchFriendQuery(req.params);
    success("fetchFriendController - sucessfully retrieved data ", JSON.stringify(data.rows));
    return res.status(200).send(data.rows);
  } catch (err) {
    error("fetchFriendController - error= ", err);
    return res.status(400).send(err);
  }
};

export const delFriendController = async (req, res) => {
  try {
    const data = await delFriendQuery(req.params);
    success("delFriendController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
    return res.status(200).send(data.rows);
  } catch (err) {
    error("delFriendController - error= ", err);
    return res.status(400).send(err);
  }
};

export const updateFriendController = async (req, res) => {
  try {
    const data = await updateFriendQuery(req.params);
    success("updateFriendController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
    return res.status(200).send(data.rows);
  } catch (err) {
    error("updateFriendController - error= ", err);
    return res.status(400).send(err);
  }
};
