import Users from "./models/usersModel.js";

const setup = async () => {
  await Users.drop();
  await Users.sync();
};

setup();
