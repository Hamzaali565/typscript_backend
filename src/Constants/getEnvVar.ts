import * as dotenv from "dotenv";
dotenv.config();

const envVar = (data: string): string | undefined => {
  return process.env[data];
};

export { envVar };
