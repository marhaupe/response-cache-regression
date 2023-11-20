import type { Product, QueryResolvers } from './../../../types.generated';
export const product: NonNullable<QueryResolvers['product']> = async (
  _parent,
  _arg,
) => {
  if (!_arg.id) {
    return null;
  }

  return {
    id: _arg.id,
  } as Product;
};
