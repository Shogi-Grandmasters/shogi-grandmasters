import { createUsersTable, dropUsersTable } from "./models/usersModel.js";
import {
  createMessagesTable,
  dropMessagesTable
} from "./models/messagesModel.js";
import { createMatchesTable, dropMatchesTable } from "./models/matchesModel.js";
import {
  createOpenMatchesTable,
  dropOpenMatchesTable
} from "./models/openMatchesModel.js";

const setup = async () => {
  await dropMessagesTable();
  await dropOpenMatchesTable();
  await dropMatchesTable();
  await dropUsersTable();
  await createUsersTable();
  await createOpenMatchesTable();
  await createMatchesTable();
  await createMessagesTable();
};

setup();
