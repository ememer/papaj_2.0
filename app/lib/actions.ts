import { GraphQLClient } from "graphql-request";

const API_URL = "http://127.0.0.1:4000/graphql"

const client = new GraphQLClient(API_URL);

export const makeGraphqlRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};
