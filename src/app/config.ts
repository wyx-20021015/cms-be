import * as dotenv from "dotenv";
dotenv.config();
let {
  APP_PORT,
  MONGO_DB,
  MONGO_PORT,
  MONGO_HOST
} = process.env
export {
  APP_PORT,
  MONGO_DB,
  MONGO_PORT,
  MONGO_HOST
}
