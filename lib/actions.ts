import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const API_KEY = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "xxx";

const API_URL = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const SERVER_URL = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(API_URL);
export const makeGraphqlRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphqlRequest(getUserQuery, { email });
};

export const createUser = (
  name: string,
  email: string,
  avatarUrl: string,
  displayName: string = name
) => {
  client.setHeader("x-api-key", API_KEY);
  const variables = {
    input: {
      name,
      email,
      displayName,
      avatarUrl,
    },
  };

  return makeGraphqlRequest(createUserMutation, variables);
};

// export const fetchToken = async () => {
//   try {
//     const response = await fetch(`${SERVER_URL}/api/auth/token`);
//     return response.json();
//   } catch (error) {
//     throw error;
//   }
// };
