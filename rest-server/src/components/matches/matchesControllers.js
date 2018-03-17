import db from "../../config/database";
import { createMatchQuery, fetchMatchQuery, updateMatchQuery } from "./matchesHelpers";
import { success, error } from "../../lib/log";

export const createMatchController = async (req, res) => {
  try {
    const data = await createMatchQuery(req.body);
    success(
      "createMatchController - successfully created match",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("createMatchController - error= ", err);
    res.status(404).send(err);
  }
};

export const fetchMatchController = async (req, res) => {
  try {
    const data = await fetchMatchQuery(req.query);
    success(
      "fetchMatchController - successfully fetched match data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("fetchMatchController - error= ", err);
    res.status(404).send(err);
  }
};


export const updateMatchController = async (req, res) => {
  try {
    const data = await updateMatchQuery(req.body);
    success(
      "updateMatchController - successfully updated match data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("updateMatchController - error= ", err);
    res.status(404).send(err);
  }
};
