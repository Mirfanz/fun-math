"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Buble from "./buble";
import { io, Socket } from "socket.io-client";
import { Message, User } from "@/types";
import { auth, db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useSession } from "@/context/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type Props = {};

const RenderChats = (chats: Message[]) => {
  const session = useSession();
  const lastUserRef = useRef<User>();
  const lastDateRef = useRef<Date>();

  return chats.map((item, index) => {
    let showUser = false;
    let showDate = false;
    if (lastUserRef.current?.email != item.user.email || index == 0) {
      lastUserRef.current = item.user;
      showUser = true;
    }
    if (lastDateRef.current?.toDateString() !== item.time.toDateString()) {
      lastDateRef.current = item.time;
      showDate = true;
      showUser = true;
    }
    return (
      <>
        {showDate && (
          <div className="bg-slate-100 py-2 text-center my-3 text-sm">
            {item.time.toDateString()}
          </div>
        )}
        <Buble
          key={"chat-" + index}
          content={item.content}
          time={item.time}
          user={item.user}
          className={showUser ? "mt-3" : ""}
          showUser={showUser}
          isMine={item.user.email == session.user?.email}
        />
      </>
    );
  });
};

const LiveChatUI = ({}: Props) => {
  const session = useSession();
  const livechatRef = collection(db, "livechat");
  const [chats, setChats] = useState<Message[]>([]);
  const [inpMessage, setInpMessage] = useState<string>();

  async function getData() {
    try {
      onSnapshot(
        query(livechatRef, orderBy("time", "asc")),
        (snapshot) => {
          const newChats: Message[] = [];
          snapshot.docs.map((doc) => {
            if (!doc.exists()) return;
            const data = doc.data();
            newChats.push({
              user: {
                name: data.user?.name || "Tanpa Nama",
                email: data.user?.email,
                image: data.user?.image,
              },
              time: new Date(data.time.seconds * 1000),
              content: data.message,
            });
          });
          setChats(newChats);
          setTimeout(() => {
            // if (document.body.scrollHeight - window.scrollY < 1000)
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 100);
        },
        (error) => {
          console.error("Error listening to documents: ", error);
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function handleSendMessage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!session?.user) return;
    // e.target.disabled = true;
    if (!inpMessage?.length) return;
    addDoc(collection(db, "/livechat"), {
      user: {
        name: session.user.displayName,
        image: session.user.photoURL,
        email: session.user.email,
      },
      time: new Date(),
      message: inpMessage,
    });
    setInpMessage("");
    // e.target.disabled = false;
  }
  return (
    <main>
      <div className="container mt-3 mb-16">{RenderChats(chats)}</div>
      <div className="fixed bottom-0 bg-slate-100 left-0 right-0">
        <div className="container">
          {!session.user ? (
            <div className="mt-2 mb-3">
              <Button
                onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                className="w-full uppercase"
              >
                Login To Send Message
              </Button>
            </div>
          ) : (
            <div className="flex mt-2 mb-3 gap-2 items-center">
              <Input
                placeholder="Ketik Sesuatu"
                className=""
                value={inpMessage}
                onChange={(e) => setInpMessage(e.target.value)}
              />
              <Button
                onClick={handleSendMessage}
                type="submit"
                size={"icon"}
                className="aspect-square"
              >
                <SendIcon className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LiveChatUI;
