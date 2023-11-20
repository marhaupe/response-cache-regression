import invariant from 'ts-invariant';
import type { ProductResolvers } from './../../types.generated';
import { ProductUserRatingID } from './ProductUserRating';

export const Product: ProductResolvers = {
  id: async (_parent) => {
    return String(_parent.id);
  },
  totalRating: async (_parent, _, _ctx) => {
    const product = await _ctx.productService.getProduct(String(_parent.id));
    if (!product) {
      return null;
    }
    const { ratingScore, ratingCount } = product;

    const likesCount = (ratingScore + ratingCount) / 2;
    const dislikesCount = ratingCount - likesCount;

    invariant(
      likesCount + dislikesCount === ratingCount,
      'inferred the wrong number of likes and dislikes',
    );

    return {
      id: String(_parent.id),
      dislikesCount,
      likesCount,
      score: ratingScore,
    };
  },
  userRating: async (_parent, _arg, _ctx) => {
    const userId = _ctx.clientInfo.userId ?? _arg.userId;
    if (!userId) {
      return null;
    }
    const userProductRating = await _ctx.productService.getUserProductRating(
      userId,
      _parent.id,
    );
    if (!userProductRating) {
      return null;
    }
    return {
      id: ProductUserRatingID.stringify(userId, _parent.id),
      timestamp: userProductRating.user_rating.timestamp.getTime(),
      type: userProductRating.user_rating.rating,
    };
  },
};
