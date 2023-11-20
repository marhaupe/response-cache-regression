import { GraphQLResolveInfo } from 'graphql';
import { Context } from 'src/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  productRate: UserProductRatingMutationResult;
};

export type MutationProductRateArgs = {
  id: Scalars['String']['input'];
  rating: ProductRatingType;
};

export type MutationResult = {
  __typename?: 'MutationResult';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID']['output'];
  totalRating?: Maybe<ProductTotalRating>;
  userRating?: Maybe<ProductUserRating>;
};

export type ProductUserRatingArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ProductRatingType = 'DISLIKE' | 'LIKE';

export type ProductTotalRating = {
  __typename?: 'ProductTotalRating';
  dislikesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likesCount: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
};

export type ProductUserRating = {
  __typename?: 'ProductUserRating';
  id: Scalars['ID']['output'];
  timestamp: Scalars['Float']['output'];
  type: ProductRatingType;
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
};

export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type UserProductRatingMutationResult = {
  __typename?: 'UserProductRatingMutationResult';
  product?: Maybe<Product>;
  result: MutationResult;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  MutationResult: ResolverTypeWrapper<MutationResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Product: ResolverTypeWrapper<Product>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ProductRatingType: ProductRatingType;
  ProductTotalRating: ResolverTypeWrapper<ProductTotalRating>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ProductUserRating: ResolverTypeWrapper<ProductUserRating>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Query: ResolverTypeWrapper<{}>;
  UserProductRatingMutationResult: ResolverTypeWrapper<UserProductRatingMutationResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  String: Scalars['String']['output'];
  MutationResult: MutationResult;
  Boolean: Scalars['Boolean']['output'];
  Product: Product;
  ID: Scalars['ID']['output'];
  ProductTotalRating: ProductTotalRating;
  Int: Scalars['Int']['output'];
  ProductUserRating: ProductUserRating;
  Float: Scalars['Float']['output'];
  Query: {};
  UserProductRatingMutationResult: UserProductRatingMutationResult;
};

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars['Int']['input']>;
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = CacheControlDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  productRate?: Resolver<
    ResolversTypes['UserProductRatingMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationProductRateArgs, 'id' | 'rating'>
  >;
};

export type MutationResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['MutationResult'] = ResolversParentTypes['MutationResult'],
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalRating?: Resolver<
    Maybe<ResolversTypes['ProductTotalRating']>,
    ParentType,
    ContextType
  >;
  userRating?: Resolver<
    Maybe<ResolversTypes['ProductUserRating']>,
    ParentType,
    ContextType,
    Partial<ProductUserRatingArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTotalRatingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ProductTotalRating'] = ResolversParentTypes['ProductTotalRating'],
> = {
  dislikesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductUserRatingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ProductUserRating'] = ResolversParentTypes['ProductUserRating'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProductRatingType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  product?: Resolver<
    Maybe<ResolversTypes['Product']>,
    ParentType,
    ContextType,
    RequireFields<QueryProductArgs, 'id'>
  >;
};

export type UserProductRatingMutationResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserProductRatingMutationResult'] = ResolversParentTypes['UserProductRatingMutationResult'],
> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['MutationResult'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  MutationResult?: MutationResultResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductTotalRating?: ProductTotalRatingResolvers<ContextType>;
  ProductUserRating?: ProductUserRatingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserProductRatingMutationResult?: UserProductRatingMutationResultResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};
