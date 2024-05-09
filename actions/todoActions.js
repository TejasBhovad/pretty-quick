import db from "@/db/index";
import { users, todo } from "@/db/schema";

import { asc, query } from "drizzle-orm";
import { eq, not } from "drizzle-orm";

// export const addTodo = async (id, text) => {
//   await db.insert(todo).values({
//     id: id,
//     text: text,
//   });
// };

// export const getData = async () => {
//   const data = await db.select().from(todo).orderBy(asc(todo.id));
//   return data;
// };

// export const editTodo = async (id, text) => {
//   await db
//     .update(todo)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));
// };
// export const toggleTodo = async (id) => {
//   await db
//     .update(todo)
//     .set({
//       done: not(todo.done),
//     })
//     .where(eq(todo.id, id));
// };
// export const deleteTodo = async (id) => {
//   await db.delete(todo).where(eq(todo.id, id));
// };

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
