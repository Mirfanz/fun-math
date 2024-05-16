import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types";
import React from "react";

type Props = {
  user: User;
  isMine: boolean;
  time: Date;
  content: string;
};

const Buble = ({ user, isMine, content, time }: Props) => {
  return (
    <Card
      className={
        "w-96 max-w-[85%] border-2 mb-3 overflow-hidden rounded-2xl " +
        (isMine
          ? "ms-auto rounded-se-none bg-teal-50"
          : " rounded-ss-none bg-slate-50")
      }
    >
      <div
        className={
          "flex py-1 px-2 items-center gap-2 " +
          (isMine ? "bg-teal-100" : "bg-slate-100 ")
        }
      >
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="text-sm">{user.name?.[0]}</AvatarFallback>
        </Avatar>
        <h6 className="text-sm font-medium">{user.name}</h6>
        <small className="ms-auto text-xs">{time.toLocaleTimeString()}</small>
      </div>
      <div className="py-2 px-3 text-sm">{content}</div>
    </Card>
  );
};

export default Buble;
