import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User table with improved ID generation and unique constraint
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // `unique()` is not needed as primary keys are unique
  name: text("name"),
  image: text("image"),
  email: text("email").notNull().unique(), // Ensure unique email addresses
});

// Todo table
export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Ensure author ID exists in users table
});

// Define relationships using relations
export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todo),
}));

export const todoRelations = relations(todo, ({ one }) => ({
  author: one(users, {
    fields: [todo.authorId],
    references: [users.id],
  }),
}));
