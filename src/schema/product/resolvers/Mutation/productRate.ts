import invariant from 'ts-invariant';
import type { MutationResolvers } from './../../../types.generated';
import { ProductUserRatingID } from '../ProductUserRating';

export const productRate: NonNullable<
  MutationResolvers['productRate']
> = async (_parent, _arg, _ctx) => {
  try {
    invariant(_ctx.clientInfo.userId, 'user info missing');
    const { product } = await _ctx.productService.rateProduct(
      _ctx.clientInfo.userId,
      _arg.id,
      _arg.rating,
    );
    invariant(product, 'unknown error rating product');
    _ctx.responseCache?.invalidate([
      {
        typename: 'ProductUserRating',
        id: ProductUserRatingID.stringify(_ctx.clientInfo.userId, _arg.id),
      },
      {
        typename: 'ProductTotalRating',
        id: _arg.id,
      },
    ]);
    return {
      product: {
        ...product,
        id: String(product.id),
      },
      result: {
        success: true,
      },
    };
  } catch (e) {
    _ctx.log.error(`error rating product: ${e}`);
    return {
      product: null,
      result: {
        success: false,
        message: JSON.stringify(e),
      },
    };
  }
};
