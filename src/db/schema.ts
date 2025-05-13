import { sql } from 'drizzle-orm';
import { foreignKey } from 'drizzle-orm/gel-core';
import { integer, primaryKey ,sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('usuarios', {
  id: integer('id').primaryKey(),
  nome: text('nome').notNull(),
  data: integer('data').notNull(),
  email: text('email').unique().notNull(),
  senha: text('senha').unique().notNull(),
});

export const seriesTable = sqliteTable('series', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  conteudo: text('conteudo').notNull(),
  tamanho: integer('tamanho').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export const usersSeriesTable = sqliteTable('usuarios-series', {
    userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  seriesId: integer('series_id')
    .notNull()
    .references(() => seriesTable.id),
}, (table) => ({
  pk: primaryKey(table.userId, table.seriesId),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof seriesTable.$inferInsert;
export type SelectPost = typeof seriesTable.$inferSelect;

export type InsertUserSeries = typeof usersSeriesTable.$inferInsert;
export type SelectUserSeries = typeof usersSeriesTable.$inferSelect;