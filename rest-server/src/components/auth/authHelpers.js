import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import { signUpHelper, loginHelper } from './authSQL';

export const signUpQuery = async body => {
  try {
    const queryString = signUpHelper(body);
    const data = await db.query(queryString);
    success("signUpQuery - successfully retrieved data ", JSON.stringify(data));
    return data;
  } catch (err) {
    error("signUpQuery - error= ", err);
    throw new Error(err);
  }
};

export const loginQuery = async body => {
  try {
    const queryString = loginHelper(body);
    const data = await db.query(queryString);
    success("loginQuery - successfully retrieved data ", JSON.stringify(data));
    return data;
  } catch (err) {
    error("loginQuery - error= ", err);
    throw new Error(err);
  }
};
