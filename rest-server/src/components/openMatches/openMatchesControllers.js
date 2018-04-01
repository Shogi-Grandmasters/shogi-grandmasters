import {
  createOpenMatchQuery,
  fetchOpenMatchQuery,
  deleteOpenMatchQuery
} from "./openMatchesHelpers";
import { success, error } from "../../lib/log";

export const createOpenMatchController = async (req, res) => {
  try {
    const data = await createOpenMatchQuery(req.body);
    success(
      "createOpenMatchController - successfully created open match",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("createOpenMatchController - error= ", err);
    res.status(404).send(err);
  }
};

export const fetchOpenMatchController = async (req, res) => {
  try {
    const data = await fetchOpenMatchQuery(req.query);
    success(
      "fetchOpenMatchController - successfully fetched open match data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("fetchOpenMatchController - error= ", err);
    res.status(404).send(err);
  }
};

export const deleteOpenMatchController = async (req, res) => {
  try {
    const data = await deleteOpenMatchQuery(req.body);
    success(
      "deleteOpenMatchController - successfully deleted open match data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("deleteOpenMatchController - error= ", err);
    res.status(404).send(err);
  }
};