import { createUsersTable, dropUsersTable } from "./models/usersModel.js";
import { createMessagesTable, dropMessagesTable } from "./models/messagesModel.js";
import { createMatchesTable, dropMatchesTable } from "./models/matchesModel.js";

const setup = async () => {
  await dropMessagesTable();
  await dropMatchesTable();
  await dropUsersTable();
  await createUsersTable();
  await createMatchesTable();
  await createMessagesTable();
};

setup();
