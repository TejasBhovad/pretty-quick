"use server";
import db from "@/db/index";
import { users, todo } from "@/db/schema";

import { asc } from "drizzle-orm";
import { eq } from "drizzle-orm";

// ACTIONS

//  add user
export const addUser = async (name, image, email) => {
  console.log("name", name);
  try {
    const user = await db
      .insert(users)
      .values({
        name: name,
        image: image,
        email: email,
      })
      .returning();
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

//  get user
export const getUser = async () => {
  const data = await db.select().from(users).orderBy(asc(users.id));
  return data;
};

export const getUserByEmail = async (email) => {
  console.log("email", email);
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
};

//  create todo
export const addTodo = async (userID, text) => {
  const data = await db
    .insert(todo)
    .values({
      text: text,
      authorId: userID,
    })
    .returning();
  return data;
};

//  get todo by user
export const getTodos = async (author_id) => {
  const data = await db.select().from(todo).where(eq(todo.authorId, author_id));
  return data;
};

export const updateTodo = async (author_id, task_id, done) => {
  const data = await db
    .update(todo)
    .set({ done: done })
    .where(eq(todo.authorId, author_id))
    .where(eq(todo.id, task_id))
    .returning();
  return data;
};
export const deleteTodo = async (id) => {
  const data = await db.delete(todo).where(eq(todo.id, id)).returning();
  return data;
};
