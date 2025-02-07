import { config } from "dotenv";
config();

import { noteSeed } from "./note-seed.js";
import { userSeed } from "./user-seed.js";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";
import dbconnect from "../config/dbConnection.js";

dbconnect();

const reset = async () => {
  await noteSchema.deleteMany();
  await userSchema.deleteMany();
  console.log("Database reset");
};

const seed = async () => {
  await userSeed(10);
  await noteSeed(20);
};

await reset();
await seed();
