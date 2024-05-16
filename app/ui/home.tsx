"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast as sonner } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";

type Props = {};

const Home = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [inpRoomCode, setInpRoomCode] = useState<string>();
  const [authState, setAuthState] = useState<string>();
  const [authStateReady, setAuthStateReady] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState(user ? "LoggedIn" : "Not LoggedIn");
      console.log(auth.currentUser);
    });
    auth
      .authStateReady()
      .then(() => setAuthStateReady(true))
      .catch(() => setAuthStateReady(false));
  }, []);

  return (
    <main>
      <div className="container mt-4">
        {authState} | {authStateReady ? "Ready" : "noo"}|
        {auth.currentUser ? "ADA" : "GAADA"}
        <hr />
        auth.currentUser:
        {auth.currentUser?.displayName}
        <hr />
        {auth.currentUser ? (
          <Button
            onClick={() => {
              auth.signOut();
            }}
          >
            SignOut
          </Button>
        ) : (
          <Button
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider());
            }}
          >
            Login Dengan Google
          </Button>
        )}
        <Card className="mb-3 duration-150">
          <CardHeader>
            <CardTitle className="">Creapline</CardTitle>
            <CardDescription className="line-clamp-2">
              Salah satu psikotes yang sering dipake perusahaan saat
              recruitment.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Link href="/game/creapline">
              <Button size={"sm"}>Mulai Bermain</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Home;
