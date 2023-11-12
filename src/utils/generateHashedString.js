import bcrypt from "bcrypt";

const saltRounds = 10;

export default async (str) => await bcrypt.hash(str, saltRounds);
