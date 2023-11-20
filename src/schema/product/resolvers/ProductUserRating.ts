import type { ProductUserRatingResolvers } from './../../types.generated';

export class ProductUserRatingID {
  static stringify(userId: string, productDatoId: string): string {
    return `ProductUserRating:${userId}:${productDatoId}`;
  }
}

export const ProductUserRating: ProductUserRatingResolvers = {
  /* Implement ProductUserRating resolver logic here */
};
