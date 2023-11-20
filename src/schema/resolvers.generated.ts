/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from './types.generated';
import { productRate as Mutation_productRate } from './product/resolvers/Mutation/productRate';
import { MutationResult } from './base/resolvers/MutationResult';
import { Product } from './product/resolvers/Product';
import { ProductTotalRating } from './product/resolvers/ProductTotalRating';
import { ProductUserRating } from './product/resolvers/ProductUserRating';
import { product as Query_product } from './product/resolvers/Query/product';
import { UserProductRatingMutationResult } from './product/resolvers/UserProductRatingMutationResult';
export const resolvers: Resolvers = {
  Query: { product: Query_product },
  Mutation: { productRate: Mutation_productRate },

  MutationResult: MutationResult,
  Product: Product,
  ProductTotalRating: ProductTotalRating,
  ProductUserRating: ProductUserRating,
  UserProductRatingMutationResult: UserProductRatingMutationResult,
};
