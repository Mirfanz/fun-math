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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/context/auth-provider";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { GithubIcon, GoalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const LoginUI = (props: Props) => {
  const session = useSession();
  const router = useRouter();
  const redirectUrl = useSearchParams().get("redirectUrl");

  if (!session.stateReady) return <div>Loading...</div>;
  else if (session.user) router.replace(redirectUrl || "/account");
  return (
    <main>
      <div className="container mt-4 h-screen flex items-center justify-center">
        <Card className="w-full overflow-hidden">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <Link href={"/register"} replace>
              <Button size={"sm"} variant={"secondary"}>
                Register
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-3">
                <div className="">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div className="">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                <Button type="submit">Sign In</Button>
                <Button type="button" variant={"link"}>
                  Forgot Password?
                </Button>
              </div>
            </form>
            <div className="flex items-center gap-4 my-4">
              <hr className="w-full" />
              OR
              <hr className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() =>
                  signInWithRedirect(auth, new GoogleAuthProvider())
                }
              >
                <GoalIcon className="w-4 h-4 me-2" /> Login With Google
              </Button>
              <Button>
                <GithubIcon className="w-4 h-4 me-2" /> Login With Github
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginUI;
