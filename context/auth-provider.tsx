"use client";

import { auth } from "@/firebase";
import { Session, SignInProps } from "@/types";
import { Auth, User } from "firebase/auth";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user?.displayName);
      setIsAuthenticated(user ? true : false);
      setUser(user);
    });

    auth
      .authStateReady()
      .then(() => setStateReady(true))
      .catch(() => setStateReady(false));
  }, []);

  const signIn = ({ type, redirectUrl }: SignInProps = {}) => {
    const loginUrl = `/login?redirectUrl=${encodeURIComponent(
      redirectUrl || window.location.href
    )}`;
    return type === "replace"
      ? router.replace(loginUrl)
      : router.push(loginUrl);
  };

  const signOut = () => auth.signOut();

  return (
    <SessionContext.Provider
      value={{ user: user, stateReady, signIn, signOut, isAuthenticated }}
    >
      {children}
    </SessionContext.Provider>
  );
};
