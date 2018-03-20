import db from "../../config/database";
import {
  findUserQuery,
  fetchUsersQuery,
  deleteUsersQuery,
  updateUserQuery
} from "./userHelpers";
import { success, error } from "../../lib/log";

export const findUserController = async (req, res) => {
  try {
    const data = await usersQuery(req.body);
    success(
      `userController - sucessfully retrieved data ${JSON.stringify(
        data.rows[0]
      )}`
    );
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error(`userController - error= ${err}`);
    return res.status(400).send(err);
  }
};

export const fetchUserController = async (req, res) => {
  try {
    const data = await fetchUserQuery(req.body);
    success(
      "fetchUserController - successfully fetched user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("fetchUserController - error= ", err);
    res.status(404).send(err);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const data = await deleteUserQuery(req.body);
    success(
      "deleteUserController - successfully deleted user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("deleteUserController - error= ", err);
    res.status(404).send(err);
  }
};

export const updateUserController = async (req, res) => {
  try {
    const data = await updateUserQuery(req.body);
    success(
      "updateUserController - successfully updated user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("updateUserController - error= ", err);
    res.status(404).send(err);
  }
};