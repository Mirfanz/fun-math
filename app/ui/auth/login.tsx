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
import {
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { AlertCircleIcon, GithubIcon, GoalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {};

const LoginUI = (props: Props) => {
  const session = useSession();
  const router = useRouter();
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl");

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setField((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    signInWithEmailAndPassword(auth, field.email, field.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Swal.fire({
          icon: "success",
          toast: true,
          position: "top-end",
          title: `Halo, ${user.displayName}`,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        const message = error.code.replace("auth/", "").replaceAll("-", " ");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace(redirectUrl || "/account");
      }
    });
  }, []);

  if (!session.stateReady) return <div>Loading...</div>;
  else if (session.user) router.replace(redirectUrl || "/account");
  return (
    <Card className="w-full bg-opacity-75">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
        <Link href={"/register"} replace>
          <Button size={"sm"} variant={"secondary"}>
            Register
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <div className="">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={field.email}
                onChange={inputChangeHandler}
                placeholder="email@example.com"
              />
            </div>
            <div className="">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={field.password}
                onChange={inputChangeHandler}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Sign In"}
            </Button>
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
            onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
          >
            <GoalIcon className="w-4 h-4 me-2" /> Login With Google
          </Button>
          <Button
            onClick={() => {
              signInWithPopup(auth, new GithubAuthProvider()).then((result) => {
                console.log(result);
              });
            }}
          >
            <GithubIcon className="w-4 h-4 me-2" /> Login With Github
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginUI;
