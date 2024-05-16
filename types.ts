import { Auth, User as AuthUser } from "firebase/auth";

export interface PageProps {
  params?: any;
  searchParams?: any;
}

export interface CreaplineLeaderboard {
  name: string;
  email: string;
  image: string;
  time: number;
}

export interface User {
  uid?: string;
  name: string;
  email?: string;
  image?: string;
}

export interface Session {
  user: AuthUser | null;
  stateReady: boolean;
}

export interface Message {
  user: User;
  time: Date;
  content: string;
}
