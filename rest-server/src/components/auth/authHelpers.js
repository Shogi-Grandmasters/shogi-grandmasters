import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import { signUpHelper, loginHelper, passwordHelper } from './authSQL';

export const signUpQuery = async body => {
  try {
    const queryString = signUpHelper(body);
    const data = await db.queryAsync(queryString);
    success("signUpQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("signUpQuery - error= ", err);
    throw new Error(err);
  }
};

export const loginQuery = async body => {
  try {
    const queryString = loginHelper(body);
    const data = await db.queryAsync(queryString);
    success("loginQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("loginQuery - error= ", err);
    throw new Error(err);
  }
};

export const resetPasswordQuery = async body => {
  try {
    const queryString = passwordHelper(body);
    const data = await db.queryAsync(queryString);
    success("resetPasswordQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("resetPasswordQuery - error= ", err);
    throw new Error(err);
  }
};
