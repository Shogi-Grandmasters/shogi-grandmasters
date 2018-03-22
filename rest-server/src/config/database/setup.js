import { createUsersTable, dropUsersTable } from "./models/usersModel.js";
import {
  createMessagesTable,
  dropMessagesTable
} from "./models/messagesModel.js";
import {
  createModifiedDateFunction,
  createModifiedDateTrigger,
  createMatchesTable,
  dropMatchesTable,
   } from "./models/matchesModel.js";
import {
  createOpenMatchesTable,
  dropOpenMatchesTable
} from "./models/openMatchesModel.js";
import { createFriendsTable, dropFriendsTable } from "./models/friendsModel.js";
import { createLeaderboardTable, dropLeaderboardTable } from "./models/leaderboardModel.js";

const setup = async () => {
  await dropLeaderboardTable();
  await dropFriendsTable();
  await dropMessagesTable();
  await dropOpenMatchesTable();
  await dropMatchesTable();
  await dropUsersTable();
  await createUsersTable();
  await createOpenMatchesTable();
  await createModifiedDateFunction();
  await createMatchesTable();
  await createModifiedDateTrigger('matches');
  await createMessagesTable();
  await createFriendsTable();
  await createLeaderboardTable();
};

setup();
