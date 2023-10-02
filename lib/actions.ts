import { SessionInterface } from "@/common.types";
import {
  createManyReschedulesDates,
  createNewMeetingMutation,
  createUserMutation,
  deleteMeetingDate,
  getNewMeetingDate,
  getUserCollectionQuery,
  getUserQuery,
  publishMeetingReschedule,
  updateMeetingQuery,
  updateRescheduleVotes,
} from "@/graphql";
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

export const getUser = async (email: string) => {
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

export const getUserCollection = (id: Array<string>) => {
  client.setHeader("x-api-key", API_KEY);
  const variables = {
    id: id,
  };
  return makeGraphqlRequest(getUserCollectionQuery, variables);
};

export const createNewMeeting = (
  userId: string,
  dateString: string,
  start: Date | null,
  end: Date | null,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    input: {
      createdBy: {
        link: userId,
      },
      date: dateString,
      range: [start, end],
      acceptedBy: [userId],
    },
  };

  return makeGraphqlRequest(createNewMeetingMutation, variables);
};

export const getLatestMeeting = async () => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphqlRequest(getNewMeetingDate);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const handleDelete = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphqlRequest(deleteMeetingDate, { id });
};

export const updateMeeting = async (
  id: string,
  isPublised: boolean = true,
  acceptedId: Array<string> | null = null,
  rejectedID: Array<string> | null = null,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: id,
    input: {
      isAnnounced: isPublised,
      acceptedBy: acceptedId,
      rejectedBy: rejectedID,
    },
  };
  return makeGraphqlRequest(updateMeetingQuery, variables);
};

export const updateMeetingWithReschedule = async (
  id: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: id,
    input: {
      isRescheduled: true,
    },
  };
  return makeGraphqlRequest(publishMeetingReschedule, variables);
};

export const createReschedulesVotes = async (
  token: string,
  meetingId: string,
  rescheduleDates: string[]
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    input: [
      ...rescheduleDates.map((dateString) => ({
        input: {
          date: dateString,
          meeting: {
            link: meetingId,
          },
        },
      })),
    ],
  };

  return makeGraphqlRequest(createManyReschedulesDates, variables);
};

export const updateVotes = async (
  token: string,
  rescheduleId: string,
  votes: string[]
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: rescheduleId,
    input: {
      votes: [...votes],
    },
  };
  return makeGraphqlRequest(updateRescheduleVotes, variables);
};
