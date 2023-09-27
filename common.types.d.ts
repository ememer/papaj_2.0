import { User, Session } from "next-auth";

export type UserProfile = {
  id: number;
  name: string;
  displayName: string;
  email: string;
  avatarUrl: string;
};

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    displayName: string;
  };
}

export type MeetingInterface = {
  createdBy: UserProfile;
  id: string;
  date?: string;
  range?: Array<string> | Array<null>;
  rescheduleDate?: string | null;
  rescheduleRange?: string | null;
  isAnnounced: boolean;
  createdAt: string;
  acceptedBy: [string];
  rejectedBy: [string];
};

export type UserPorifileCollection = {
  userCollection: {
    edges: {
      node: {
        avatarUrl: string;
        id: string;
        name: string;
      };
    }[];
  };
};
