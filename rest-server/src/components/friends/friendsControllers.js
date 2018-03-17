import { friendsQuery } from './friendsHelpers';
import { success, error } from "../../lib/log";

export const friendController = async (req, res) => {
  try {
    const data = await friendsQuery(req.body);
    console.log('friends controller ', data.rows[0])
    success("friendController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error("friendController - error= ", err);
    return res.status(400).send(err);
  }
};

//${JSON.stringify(data.rows[0])}