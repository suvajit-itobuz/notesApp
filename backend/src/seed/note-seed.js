import { faker } from "@faker-js/faker";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";

export const noteSeed = async (value) => {
  try {
    let notes = [];
    const users = await userSchema.find();

    for (let i = 0; i < value; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      let newNote = {
        title: faker.word.noun,
        content: faker.lorem.sentence(),
        userId: user,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      };
      notes.push(newNote);
    }
    notes.forEach(async (note) => {
      await noteSchema.create(note);
    });
  } catch (err) {
    console.log(err);
  }
};
