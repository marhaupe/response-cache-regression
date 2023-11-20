import { and, eq, inArray, sql } from 'drizzle-orm';
import {
  productTable,
  TableProduct,
  userProductRatingTable,
  userTable,
} from '../db/schema';
import { ProductRatingType } from '../schema/types.generated';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';
import { ServiceInit } from '.';
import { Logger } from 'pino';

export class ProductService {
  orm: PostgresJsDatabase;
  loader: DataLoader<string, TableProduct>;
  log: Logger;

  constructor(init: ServiceInit) {
    this.log = init.log;
    this.orm = init.orm;
    this.loader = new DataLoader(async (keys: readonly string[]) => {
      const result = await this.orm
        .select()
        .from(productTable)
        .where(inArray(productTable.datoId, [...keys]));

      return keys.map(
        (key) =>
          result.find((result) => result.datoId === key) ||
          new Error(`could not load product for id ${key}`),
      );
    });
  }

  async getProductOrThrow(datoId: string) {
    return this.loader.load(datoId);
  }

  async getProduct(datoId: string) {
    try {
      return await this.getProductOrThrow(datoId);
    } catch (e) {
      return null;
    }
  }

  async getProductAttribute<T extends keyof TableProduct>(
    datoId: string,
    attribute: T,
  ): Promise<TableProduct[T] | null> {
    return (await this.getProduct(datoId))?.[attribute] ?? null;
  }

  async productExists(datoId: string) {
    return (
      ((
        await this.orm
          .select({ id: productTable.id })
          .from(productTable)
          .where(eq(productTable.datoId, datoId))
      )?.length ?? 0) > 0
    );
  }

  async rateProduct(userId: string, datoId: string, rating: ProductRatingType) {
    const dbUserProductRating = (
      await this.orm
        .select()
        .from(userProductRatingTable)
        .innerJoin(
          productTable,
          eq(productTable.id, userProductRatingTable.productId),
        )
        .where(
          and(
            eq(productTable.datoId, datoId),
            eq(userProductRatingTable.userId, userId),
          ),
        )
    )[0];

    const isUserChangedVote =
      dbUserProductRating && dbUserProductRating.user_rating.rating !== rating;

    const isUserRemovedVote =
      dbUserProductRating && dbUserProductRating.user_rating.rating === rating;

    return this.orm.transaction(async (tx) => {
      const dbProduct = (
        await tx
          .insert(productTable)
          .values({
            datoId,
            ratingCount: 1,
            ratingScore: rating === 'DISLIKE' ? -1 : 1,
          })
          .onConflictDoUpdate({
            target: productTable.datoId,
            set: {
              ratingCount: isUserChangedVote
                ? sql`${productTable.ratingCount}`
                : isUserRemovedVote
                ? sql`${productTable.ratingCount} - 1`
                : sql`${productTable.ratingCount} + 1`,
              ratingScore: isUserChangedVote
                ? rating === 'DISLIKE'
                  ? sql`${productTable.ratingScore} - 2`
                  : sql`${productTable.ratingScore} + 2`
                : isUserRemovedVote
                ? rating === 'DISLIKE'
                  ? sql`${productTable.ratingScore} + 1`
                  : sql`${productTable.ratingScore} - 1`
                : rating === 'DISLIKE'
                ? sql`${productTable.ratingScore} - 1`
                : sql`${productTable.ratingScore} + 1`,
            },
          })
          .returning()
      )[0];

      if (!dbProduct) {
        tx.rollback();
        throw new GraphQLError('unknown error rating product');
      }

      await tx.insert(userTable).values({
        id: userId,
      });

      if (isUserRemovedVote) {
        await tx
          .delete(userProductRatingTable)
          .where(
            and(
              eq(userProductRatingTable.userId, userId),
              eq(userProductRatingTable.productId, dbProduct.id),
            ),
          );
      } else {
        await tx
          .insert(userProductRatingTable)
          .values({
            userId,
            productId: dbProduct.id,
            rating,
            timestamp: new Date(),
          })
          .onConflictDoUpdate({
            target: [
              userProductRatingTable.userId,
              userProductRatingTable.productId,
            ],
            set: {
              rating,
              timestamp: new Date(),
            },
          });
      }

      return { product: dbProduct };
    });
  }

  async getUserProductRating(userId: string, datoId: string) {
    return (
      await this.orm
        .select()
        .from(userProductRatingTable)
        .innerJoin(
          productTable,
          eq(productTable.id, userProductRatingTable.productId),
        )
        .where(
          and(
            eq(productTable.datoId, datoId),
            eq(userProductRatingTable.userId, userId),
          ),
        )
    )[0];
  }
}
