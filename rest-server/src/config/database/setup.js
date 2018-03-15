import Users from "./models/usersModel.js";
// import { createUserTable } from  "../../lib/SQL";

const setup = async () => {
  await Users.drop();
  await Users.sync();
  // await createUserTable();
};

setup();
