import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cashed = global.mongoose;

if (!cashed) {
  cashed = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cashed.conn) return cashed.conn;

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "zen-anime",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cashed.conn = await cashed.promise;
  return cashed.conn;
};
