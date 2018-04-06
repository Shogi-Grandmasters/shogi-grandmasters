import { createMatchQuery, fetchMatchQuery, updateMatchQuery, endMatchQuery, historyMatchQuery } from "./matchesHelpers";
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
      "fetchMatchController - successfully fetched match data");
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

export const endMatchController = async (req, res) => {
  try {
    const data = await endMatchQuery(req.body);
    success(
      "endMatchController - successfully updated match and user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("endMatchController - error submitting match-end data = ", err);
    res.status(500).send(err);
  }
}

export const historyMatchController = async (req, res) => {
  try {
    const data = await historyMatchQuery(req.query);
    success(
      "historyMatchController - successfully fetched match history data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("historyMatchController - error= ", err);
    res.status(404).send(err);
  }
};