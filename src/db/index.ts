import { connect, connection } from "mongoose";
import { MONGO_DB, MONGO_PORT, MONGO_HOST } from "../app/config"

export default function setupMongo() {
  const DB_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
  // const DB_URL = "mongodb://localhost:27017/wyxBlog";
  connect(DB_URL);

  return new Promise<void>((resolve, reject) => {
    connection.on("connected", () => {
      console.log("connected to mongodb");
      resolve();
    });
    connection.on("error", (error) => {
      console.log("mongodb数据库连接失败", error);
      reject();
    });
  });
};
