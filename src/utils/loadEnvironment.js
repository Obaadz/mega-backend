import { config } from "dotenv";

export default () => {
  if (process.env.ENV_ALREADY_LOADED) return;

  config();

  console.log(`Current node environment is ${process.env.NODE_ENV}`);
};
