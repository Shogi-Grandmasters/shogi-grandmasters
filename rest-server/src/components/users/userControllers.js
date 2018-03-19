import db from "../../config/database";
import {
  fetchUsersQuery,
  deleteUsersQuery,
  updateUserQuery
} from "./userHelpers";
import { success, error } from "../../lib/log";

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
