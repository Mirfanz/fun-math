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
import React, { useState } from "react";
import { toast as sonner } from "sonner";

type Props = {};

const Home = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [inpRoomCode, setInpRoomCode] = useState<string>();

  return (
    <main>
      <div className="container mt-4">
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
              <Button size={"sm"}>Latihan</Button>
            </Link>
            <Dialog>
              <DialogTrigger>
                <Button size={"sm"}>Main Bareng</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mabar Creapline</DialogTitle>
                  <DialogDescription>
                    Masukkan Kode Room Mabar
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      placeholder="Kode Room"
                      onChange={(e) => setInpRoomCode(e.target.value)}
                      value={inpRoomCode}
                      autoComplete="off"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="px-3"
                    onClick={() => {
                      if (!inpRoomCode) return;
                      router.push("/game/creapline/" + inpRoomCode);
                    }}
                  >
                    Masuk Room
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Home;
