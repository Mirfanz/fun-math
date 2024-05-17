import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "@/types";
import React, { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User;
  isMine: boolean;
  time: Date;
  content: string;
  showUser?: boolean;
  className?: string;
};

const Buble = ({ user, isMine, content, time, showUser, className }: Props) => {
  const [lessContent, setLessContent] = useState(true);
  return (
    <Card
      className={twMerge(
        className,
        "w-max max-w-[85%] hover:brightness-95 duration-100 border-2 mb-1 overflow-hidden rounded-2xl ",
        isMine
          ? "ms-auto rounded-se-none bg-teal-50"
          : " rounded-ss-none bg-slate-50"
      )}
    >
      {showUser && !isMine && (
        <div
          className={
            "flex py-1 px-2 items-center gap-2 " +
            (isMine ? "bg-teal-100" : "bg-slate-100 ")
          }
        >
          <Avatar className="w-7 h-7">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-sm">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <h6 className="text-sm font-medium">{user.name}</h6>
        </div>
      )}
      <div className="py-2 px-3 flex flex-wrap items-end  text-sm relative">
        <p
          className={twMerge(lessContent ? "line-clamp-[10]" : "")}
          onClick={() => setLessContent((prev) => !prev)}
        >
          {content}
        </p>
        <div className="ms-auto">
          <small className="ms-1 text-xs text-gray-500">
            {time.toLocaleTimeString().slice(0, 5)}
          </small>
        </div>
      </div>
    </Card>
  );
};

export default Buble;
