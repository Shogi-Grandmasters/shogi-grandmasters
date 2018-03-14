import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async password => {
  const salt = await genSalt(JSON.parse(process.env.SALT_ROUNDS));
  const hashed = await hash(password, salt);
  return hashed;
};

export const comparePasswords = async (password, hash) => {
  const result = await compare(password, hash);
  return result;
};
