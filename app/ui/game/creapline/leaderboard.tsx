import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/firebase";
import { CreaplineLeaderboard } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import {
  LucideCalendarClock,
  MedalIcon,
  RefreshCwIcon,
  TimerIcon,
} from "lucide-react";
import React, { Suspense, useEffect, useRef, useState } from "react";

type Props = {};

const Leaderboard = (props: Props) => {
  const [leaderboard, setLeaderboard] = useState<CreaplineLeaderboard[]>([]);

  const creaplineLeaderboardRef = collection(db, "c-leaderboard");

  function getLeaderBoard() {
    onSnapshot(creaplineLeaderboardRef, (snapshot) => {
      console.log("snapshot", snapshot);
      console.log(snapshot.docs);
      const newLeaderboard: CreaplineLeaderboard[] = [];
      snapshot.docs.forEach((doc) => {
        newLeaderboard.push(doc.data() as CreaplineLeaderboard);
      });

      setLeaderboard(newLeaderboard);
    });
  }
  useEffect(() => {
    getLeaderBoard();
  }, []);
  return (
    <Card className="p-3 select-none">
      <div className="flex mb-3 justify-between items-center">
        <h4 className="font-semibold flex items-center gap-2 ms-2">
          <LucideCalendarClock className="w-5 h-5" /> Permainan Terkini
        </h4>
        {/* <Button size={"sm"} onClick={getLeaderBoard} variant={"default"}>
          <RefreshCwIcon className="w-4 h-4 me-1" /> {refreshTimer}s
        </Button> */}
      </div>
      <div className="flex gap-2 flex-col">
        <Suspense fallback="Loading...">
          {leaderboard?.map((item, index) => (
            <Card
              key={"leaderboard-" + index}
              className="p-2 flex gap-2 hover:brightness-95 duration-150 items-center"
            >
              <Avatar>
                <AvatarImage src={item.user.image || ""} />
                <AvatarFallback>
                  {item.user.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h4 className="">{item.user.name}</h4>
              <div className=" py-1 px-3 flex items-center rounded text-xs ms-auto ">
                <TimerIcon className="w-4 h-4" /> {item.time}s
              </div>
            </Card>
          ))}
        </Suspense>
      </div>
    </Card>
  );
};

export default Leaderboard;
