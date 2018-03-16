import db from "../../config/database";
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
      JSON.stringify(data.rows[0])
    );
    return res.status(200).send(data.rows[0]);
  } catch (err) {
    error("createOpenMatchController - error= ", err);
    res.status(404).send(err);
  }
};

export const fetchOpenMatchController = async (req, res) => {
  try {
    const data = await fetchOpenMatchQuery();
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