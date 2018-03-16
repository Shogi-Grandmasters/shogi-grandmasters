import db from "../../config/database";
import { createMatchQuery, updateMatchQuery } from "./matchesHelpers";
import { success, error } from "../../lib/log";

export const createMatchController = async (req, res) => {
  try {
    const data = await createMatchQuery(req.body);
    success(
      "createMatchController - successfully created match",
      JSON.stringify(data.rows[0])
    );
    return res
      .status(200)
      .send(data.rows[0]);
  } catch (err) {
    error("createMatchController - error= ", err);
    res.status(404).send(err);
  }
};

export const updateMatchController = async (req, res) => {
  try {
    const data = await updateMatchQuery(req.body);
    success(
      "updateMatchController - successfully updated match data",
      JSON.stringify(data.rows[0])
    );
    return res
      .status(200)
      .send(data[0]);
  } catch (err) {
    error("updateMatchController - error= ", err);
    res.status(404).send(err);
  }
};
