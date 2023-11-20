import { GraphQLClient, gql } from 'graphql-request';
import { v4 } from 'uuid';
import cliProgress from 'cli-progress';

const progressBar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);

const NUM_REQUESTS = 1000000;
const NUM_PRODUCTS = 1000;
const API_BASE_URL = 'http://localhost:3000/graphql';

const client = new GraphQLClient(API_BASE_URL);

const getProduct = async (productId, userId) => {
  const query = gql`
    query GetProduct($productId: String!) {
      product(id: $productId) {
        id
        totalRating {
          __typename
          score
          likesCount
          dislikesCount
        }
        userRating {
          __typename
          id
          type
        }
      }
    }
  `;

  const variables = {
    productId,
  };

  const headers = {
    'x-anon-id': userId,
  };

  await client.request(query, variables, headers);
};

const rateProduct = async (productId, rating, userId) => {
  const mutation = gql`
    mutation ProductRate($productId: String!, $rating: ProductRatingType!) {
      __typename
      productRate(id: $productId, rating: $rating) {
        __typename
        result {
          __typename
          success
        }
        product {
          __typename
          id
          totalRating {
            __typename
            score
            likesCount
            dislikesCount
          }
          userRating {
            __typename
            id
            type
          }
        }
      }
    }
  `;

  const variables = {
    productId,
    rating,
  };

  const headers = {
    'x-anon-id': userId,
  };

  await client.request(mutation, variables, headers);
};

const generateRandomProductID = () => {
  return Math.floor(Math.random() * NUM_PRODUCTS + 1).toString();
};

const generateRandomRating = () => {
  return Math.random() < 0.5 ? 'LIKE' : 'DISLIKE';
};

const executeRequests = async () => {
  progressBar.start(1000 + NUM_REQUESTS, 0);

  for (let i = 0; i < 1000; i++) {
    const userId = v4();
    const productId = generateRandomProductID();
    await getProduct(productId, userId);
    progressBar.increment();
  }

  for (let i = 0; i < NUM_REQUESTS; i++) {
    const userId = v4();
    const productId = generateRandomProductID();
    const rating = generateRandomRating();
    await getProduct(productId, userId);
    await rateProduct(productId, rating, userId);
    progressBar.increment();
  }

  progressBar.stop();
};

executeRequests().catch((error) => console.error('Error:', error));
