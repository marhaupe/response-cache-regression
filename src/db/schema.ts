import { InferModel } from 'drizzle-orm';
import {
  pgTable,
  uniqueIndex,
  primaryKey,
  serial,
  timestamp,
  varchar,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

export type TableProduct = InferModel<typeof productTable>;

export const productTable = pgTable(
  'product',
  {
    id: serial('id').primaryKey(),
    datoId: varchar('dato_id', { length: 36 }).notNull(),
    ratingScore: integer('rating_score').default(0).notNull(),
    ratingCount: integer('rating_count').default(0).notNull(),
  },
  (table) => ({
    datoIdIdx: uniqueIndex('product_dato_id_idx').on(table.datoId),
  }),
);

export type TableUser = InferModel<typeof userTable>;

export const userTable = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
});

export const userProductRatingTable = pgTable(
  'user_rating',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id, {
        onDelete: 'cascade',
      }),
    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    rating: varchar('rating', { enum: ['LIKE', 'DISLIKE'] }).notNull(),
    timestamp: timestamp('timestamp', { mode: 'date' }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.productId),
  }),
);
