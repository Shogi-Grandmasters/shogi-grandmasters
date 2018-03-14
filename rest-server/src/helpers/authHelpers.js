import db from "../config/database";
import { success, error } from "../lib/log";

export const signUpQuery = async body => {
  try {
    const queryString = signUpHelper(body);
    const data = await db.queryAsync(queryString);
    success("signUpQuery - successfully retrieved data ", JSON.stringify(data));
    return data;
  } catch (err) {
    error("signUpQuery - error= ", err);
    res.status(404).send(err);
  }
};

export const loginQuery = async body => {
  try {
    const queryString = loginHelper(body);
    const data = await db.queryAsync(queryString);
    success("loginQuery - successfully retrieved data ", data);
    return data;
  } catch (err) {
    error("loginQuery - error= ", err);
    res.status(404).send(err);
  }
};
