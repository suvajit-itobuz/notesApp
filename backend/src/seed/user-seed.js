import { faker } from "@faker-js/faker";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const userSeed = async (value) => {
  try {
    let users = [];

    for (let i = 0; i < value; i++) {
      let newUser = {
        userName: faker.person.fullName(),
        email: faker.internet.email(faker.person.fullName()).toLowerCase(),
        password: faker.internet.password(),
        verified: true,
      };
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      users.push(newUser);
    }
    users.forEach(async (user) => {
      await userSchema.create(user);
    });
  } catch (err) {
    console.log(err);
  }
};
