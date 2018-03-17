import { friendsQuery } from './friendsHelpers';

export const friendController = async (req, res) => {
  try {
    const data = await friendsQuery(req.body);
    success(`friendController - sucessfully retrieved data ${JSON.stringify(rows)}`);
    return res.status(200).send(data.rows);
  } catch (err) {
    error(`friendController - error= ${err}`);
    return res.status(400).send(err);
  }
};
