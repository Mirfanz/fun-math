"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon, TimerIcon, TimerOffIcon } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Leaderboard from "./leaderboard";
import { useToast } from "@/components/ui/use-toast";

type DataType = number[][];
type Props = {};

const CreaplineUI = ({}: Props) => {
  const toast = useToast();
  const [data, setData] = useState<DataType>([]);
  const countX: number = 15;
  const countY: number = 12;
  const maxTime: number = 250;
  const [activeX, setActiveX] = useState<number>(0);
  const [activeY, setActiveY] = useState<number>(0);
  const [isPLaying, setIsPlaying] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [hideStartButton, setHideStartButton] = useState<boolean>(false);

  const timerIntervalRef = useRef<NodeJS.Timeout>();

  function validate(key: number) {
    const result = (data[activeX][activeY] + data[activeX][activeY + 1]) % 10;
    if (key !== result) return false;
    if (activeX >= countX - 1 && activeY >= countY - 2) {
      endGame("finish");
    } else if (activeY == countY - 2) {
      setActiveX((prev) => prev + 1);
      setActiveY(0);
    } else {
      setActiveY((prev) => prev + 1);
    }
    return true;
  }

  function startGame() {
    setData(generateData(countX, countY));
    setIsPlaying(true);
    setActiveX(0);
    setActiveY(0);
    setCorrect(0);
    setIncorrect(0);

    setTimer(0);
    clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev >= maxTime - 1) endGame("timeout");
        return prev + 1;
      });
    }, 1000);
  }

  function endGame(condition: "finish" | "timeout") {
    setIsPlaying(false);
    setHideStartButton(true);
    clearInterval(timerIntervalRef.current);
    setTimeout(() => {
      setHideStartButton(false);
    }, 2000);

    switch (condition) {
      case "finish":
        Swal.fire({
          icon: "success",
          titleText: "Mantapp Brooo!",
          showConfirmButton: false,
        });
        // AddCreaplineHistory({
        //   correct: correct,
        //   inCorrect: incorrect,
        //   time: timer,
        // }).then((resp) => {
        //   if (!resp.success)
        //     toast.toast({
        //       title: "Ayo SignIn Dulu!",
        //       description: "Permainan tidak akan tersimpan jika belum signIn.",
        //       action: (
        //         <Button size={"sm"} onClick={() => signIn()}>
        //           Login
        //         </Button>
        //       ),
        //     });
        // });
        break;
      case "timeout":
        Swal.fire({
          titleText: "Waktu Habis :(",
          color: "red",
          text: "Coba lagi lah masak gitu doang nyerah.",
          showConfirmButton: false,
        });
        break;
    }
  }

  function generateData(x: number, y: number) {
    const result: DataType = [];
    for (let i = 0; i < x; i++) {
      const row: number[] = [];
      for (let j = 0; j < y; j++) row.push(Math.floor(Math.random() * 10));
      result.push(row);
    }
    return result;
  }

  return (
    <main>
      <div className={`container p-2`}>
        <div
          className={`flex mx-auto md:my-4 overflow-x-auto rounded-lg bg-white outline outline-slate-400 shadow-md items-center w-full`}
          style={{
            height: countY * 2 + "rem",
          }}
        >
          {data.length ? (
            data.map((i, posX) => (
              <div key={"data-x-" + posX} className="flex flex-col">
                {i.map((j, posY) => (
                  <div
                    key={`data-x-${posX}-y-${posY}`}
                    className={` flex duration-300  items-center justify-center w-8 aspect-square ${
                      activeX == posX &&
                      (activeY == posY || activeY + 1 == posY)
                        ? "bg-gray-200 "
                        : ""
                    }`}
                  >
                    {j}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              <h4 className="font-semibold text-2xl mb-2">Creapline?</h4>
              <p className="mb-4">Cara bermain game creapline</p>
              <iframe
                className="aspect-video w-80 rounded-md"
                src="https://www.youtube.com/embed/qjqp4ecePGg?si=qT6oIgj1djlwxH52"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div className="container mt-3">
        <div className="flex gap-1 items-center">
          <div className="me-auto flex gap-2">
            {isPLaying ? (
              <TimerIcon className="w-5 h-5" />
            ) : (
              <TimerOffIcon className="w-5 h-5" />
            )}
            <p
              className={`font-semibold ${
                timer >= maxTime ? "text-red-500" : ""
              }`}
            >
              {timer} Detik
            </p>
          </div>
          <div className="bg-red-600 py-1 px-2 text-white rounded-md">
            {incorrect} Salah
          </div>
          <div className="bg-green-600 py-1 px-2 text-white rounded-md">
            {correct} Benar
          </div>
        </div>
      </div>
      <div className="container my-4">
        {isPLaying ? (
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
              <button
                key={"button-" + n}
                className="select-none aspect-square text-2xl active:scale-95 font-semibold rounded-md bg-indigo-300"
                onClick={() => {
                  navigator.vibrate(50);
                  validate(n)
                    ? setCorrect((prev) => prev + 1)
                    : setIncorrect((prev) => prev + 1);
                }}
              >
                {n}
              </button>
            ))}
          </div>
        ) : (
          <Button
            onClick={startGame}
            disabled={hideStartButton}
            className="w-full"
            size={"lg"}
          >
            <PlayIcon className="mr-2 w-5 h-5" />
            Mulai Permainan
          </Button>
        )}
      </div>
      <div className="container my-8">
        <Suspense fallback={"Loading..."}>
          <Leaderboard />
        </Suspense>
      </div>
    </main>
  );
};

export default CreaplineUI;
