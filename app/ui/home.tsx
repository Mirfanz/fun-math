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
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const HomeUI = (props: Props) => {
  return (
    <main>
      <div className="container mt-4">
        <Card className="mb-3 duration-150">
          <CardHeader>
            <CardTitle className="">Creapline</CardTitle>
          </CardHeader>
          <CardContent className="text-justify">
            Uji kemampuan analisis dan pemecahan masalahmu dengan Creapline,
            permainan psikotes yang menantang dan mendidik.
          </CardContent>
          <CardFooter className="gap-2">
            <Link href="/game/creapline">
              <Button size={"sm"}>Mulai Bermain</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="mb-3 duration-150">
          <CardHeader>
            <CardTitle className="">Snake Jadul</CardTitle>
          </CardHeader>
          <CardContent className="text-justify">
            Nikmati permainan ular klasik yang mengasyikkan, navigasikan ular
            untuk makan titik-titik dan hindari menabrak dinding!
          </CardContent>
          <CardFooter className="gap-2">
            <Link href="/game/snake">
              <Button size={"sm"}>Mulai Bermain</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default HomeUI;
