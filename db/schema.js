import {
  pgTable,
  integer,
  text,
  boolean,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  name: text("name"),
});

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  authorId: integer("author_id"),
});

export const usersRelations = relations(users, ({ many }) => ({
  todo: many(todo),
}));

export const todoRelations = relations(todo, ({ one }) => ({
  author: one(users, {
    fields: [todo.authorId],
    references: [users.id],
  }),
}));
