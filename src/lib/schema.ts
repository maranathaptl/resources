import { date, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const sheet_music = pgTable('sheet_music', {
  id: serial('id').primaryKey(),
  piece: varchar('piece'),
  slug: varchar('slug'),
  files: json('files'),
  created_at: date('created_at'),
});