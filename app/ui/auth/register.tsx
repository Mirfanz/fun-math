"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { GithubIcon, GoalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const RegisterUI = (props: Props) => {
  const session = useSession();
  const router = useRouter();
  const redirectUrl = useSearchParams().get("redirectUrl");
  const [errors, setErrors] = useState<string[]>([]);

  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submitFormHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    if (
      !fields.fullName ||
      !fields.email ||
      !fields.password ||
      !fields.confirmPassword
    )
      setErrors((prev) => [...prev, "Semua field wajib diisi"]);
    if (fields.fullName.length < 3)
      setErrors((prev) => [...prev, "Nama lengkap minimal 3 karakter"]);
    if (fields.password.length < 8)
      setErrors((prev) => [...prev, "Password minimal 8 karakter"]);
    if (fields.password !== fields.confirmPassword)
      setErrors((prev) => [...prev, "Password tidak cocok"]);

    const newErrors: string[] = [];

    if (
      !fields.fullName ||
      !fields.email ||
      !fields.password ||
      !fields.confirmPassword
    )
      newErrors.push("Semua field wajib diisi");
    if (fields.fullName.length < 3)
      newErrors.push("Nama lengkap minimal 3 karakter");
    if (fields.password.length < 8)
      newErrors.push("Password minimal 8 karakter");
    if (fields.password !== fields.confirmPassword)
      newErrors.push("Password tidak cocok");

    setErrors(newErrors);
    if (newErrors.length) {
      setSubmitting(false);
      return;
    }

    createUserWithEmailAndPassword(auth, fields.email, fields.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fields.fullName,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Register Success",
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.code.replace("auth/", "").replaceAll("-", " "),
        });
        newErrors.push(error.code.replace("auth/", "").replaceAll("-", " "));
        setErrors(newErrors);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (!session.stateReady) return <div>Loading...</div>;
  else if (session.user) router.replace(redirectUrl || "/account");
  return (
    <Card className="w-full bg-opacity-75 !sticky top-6">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold ">Register</CardTitle>
        <Link href={"/login"} replace>
          <Button size={"sm"} variant={"secondary"}>
            Login
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {errors.length ? (
          <Alert variant={"destructive"} className="mb-3 py-2 px-3">
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index}>- {error}</p>
              ))}
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <form onSubmit={submitFormHandler}>
          <div className="flex flex-col gap-3">
            <div className="">
              <Label>Full Name</Label>
              <Input
                name="fullName"
                onChange={inputChangeHandler}
                value={fields.fullName}
                type="text"
                pattern="[A-Za-z. ]*"
                placeholder="Your Name"
              />
            </div>
            <div className="">
              <Label>Email</Label>
              <Input
                name="email"
                onChange={inputChangeHandler}
                value={fields.email}
                type="email"
                placeholder="email@example.com"
              />
            </div>
            <div className="">
              <Label>Password</Label>
              <Input
                name="password"
                onChange={inputChangeHandler}
                value={fields.password}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="">
              <Label>Repeat Password</Label>
              <Input
                name="confirmPassword"
                onChange={inputChangeHandler}
                value={fields.confirmPassword}
                type="password"
                placeholder="Repeat Password"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Register"}
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
            <GoalIcon className="w-4 h-4 me-2" /> Sign Up With Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterUI;
