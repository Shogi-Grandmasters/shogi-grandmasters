import {
  findUserQuery,
  fetchUserQuery,
  deleteUserQuery,
  updateUserQuery,
  updateUserAviQuery
} from "./userHelpers";
import { success, error } from "../../lib/log";

export const findUserController = async (req, res) => {
  try {
    const data = await findUserQuery(req.body);
    success(
      `findUserController - sucessfully retrieved data ${JSON.stringify(
        data.rows[0]
      )}`
    );
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error(`findUserController - error= ${err}`);
    return res.status(400).send(err);
  }
};

export const fetchUserController = async (req, res) => {
  try {
    const data = await fetchUserQuery(req.params);
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

export const updateUserAviController = async (req, res) => {
  try {
    const data = await updateUserAviQuery(req.params);
    success(
      "updateUserAviController - successfully fetched user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("updateUserAviController - error= ", err);
    res.status(404).send(err);
  }
};
