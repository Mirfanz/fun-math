"use client";

import { auth } from "@/firebase";
import { Session } from "@/types";
import { Auth, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SessionContext = createContext<Session | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("Harus di dalam context provider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [stateReady, setStateReady] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user?.displayName);
      setUser(user);
    });
    auth
      .authStateReady()
      .then(() => setStateReady(true))
      .catch(() => setStateReady(false));
  }, []);
  return (
    <SessionContext.Provider value={{ user: user, stateReady }}>
      {children}
    </SessionContext.Provider>
  );
};
