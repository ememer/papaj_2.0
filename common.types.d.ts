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
  };
}
