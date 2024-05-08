import db from "@/db/index";
import { todo } from "@/db/schema";
import { asc } from "drizzle-orm";
import { eq, not } from "drizzle-orm";

export const addTodo = async (id, text) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
};

export const getData = async () => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));
  return data;
};

export const editTodo = async (id, text) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));
};
export const toggleTodo = async (id) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
};
export const deleteTodo = async (id) => {
  await db.delete(todo).where(eq(todo.id, id));
};
