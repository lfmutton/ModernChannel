import { sqliteTable, integer, text, unique} from 'drizzle-orm/sqlite-core';

// Tabela de usuários
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  password: text('password').notNull(),
  birthday: text('birthday').notNull(),
});

// Tabela de séries
export const series = sqliteTable('series', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  episodeCount: integer('episode_count').notNull(),
});

// Tabela de relacionamento usuário-série (progresso de episódios)
export const userSeriesProgress = sqliteTable('user_series_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  seriesId: integer('series_id').notNull().references(() => series.id),
  currentEpisode: integer('current_episode').notNull(),
  
  // Podemos adicionar uma constraint única para evitar entradas duplicadas
}, (table) => ({
  uniqueUserSeries: unique('unique_user_series').on(table.userId, table.seriesId),
}));