import { boolean, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar()
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id).notNull(),
  courseId: varchar({ length: 255 }).notNull().unique(),
  courseName: varchar({ length: 255 }).notNull(),
  courseDescription: varchar({ length: 255 }).notNull(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().notNull(),
  difficultyLevel: varchar({ length: 50 }).notNull(),
  courseJson: json().notNull(),
  bannerImageUrl: varchar({ length: 500 }).default(""),
  userEmail: varchar({ length: 255 }).references(() => usersTable.email)
});
