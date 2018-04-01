import {
  createMessageQuery,
  fetchMessageQuery,
  deleteMessageQuery
} from "./messagesHelpers";
import { success, error } from "../../lib/log";

export const createMessageController = async (req, res) => {
  try {
    const data = await createMessageQuery(req.body);
    success(
      "createMessageController - successfully created message",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("createMessageController - error= ", err);
    res.status(404).send(err);
  }
};

export const fetchMessageController = async (req, res) => {
  try {
    const data = await fetchMessageQuery(req.query);
    success(
      "fetchMessageController - successfully fetched messages",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("fetchMessageController - error= ", err);
    res.status(404).send(err);
  }
};

// export const deleteMessageController = async (req, res) => {
//   try {
//     const data = await deleteMessageQuery(req.body);
//     success(
//       "deleteMessageController - successfully deleted message",
//       JSON.stringify(data)
//     );
//     return res.status(200).send(data);
//   } catch (err) {
//     error("deleteMessageController - error= ", err);
//     res.status(404).send(err);
//   }
// };
