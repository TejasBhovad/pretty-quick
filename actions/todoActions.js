"use server";
import db from "@/db/index";
import { users, todo } from "@/db/schema";

import { asc, query } from "drizzle-orm";
import { eq, not } from "drizzle-orm";

// ACTIONS

//  add user
export const addUser = async (name) => {
  console.log("name", name);
  return await db
    .insert(users)
    .values({
      name: name,
    })
    .returning();
};

//  get user
export const getUser = async () => {
  const data = await db.select().from(users).orderBy(asc(users.id));
  return data;
};
//  create todo
export const addTodo = async (author_id, text) => {
  await db.insert(todo).values({
    authorId: author_id,
    text: text,
    done: false,
  });
};

//  get todo by user
export const getTodo = async (author_id) => {
  const data = await db.select().from(todo).where(eq(todo.authorId, author_id));
  return data;
};
