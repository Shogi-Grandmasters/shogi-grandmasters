import { usersQuery } from './usersHelpers';
import { success, error } from "../../lib/log";

export const userController = async (req, res) => {
  try {
    const data = await usersQuery(req.body);
    success(`userController - sucessfully retrieved data ${JSON.stringify(data.rows[0])}`);
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error(`userController - error= ${err}`);
    return res.status(400).send(err);
  }
};
