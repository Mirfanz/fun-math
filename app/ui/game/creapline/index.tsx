"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayIcon, TimerIcon, TimerOffIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

type DataType = number[][];

const CreaplineUI = () => {
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

  function validate(key: number) {
    const result = (data[activeX][activeY] + data[activeX][activeY + 1]) % 10;
    if (key !== result) return false;
    if (activeX >= countX - 1 && activeY >= countY - 2) {
      endGame();
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
    setActiveX(0);
    setActiveY(0);
    setTimer(0);
    setCorrect(0);
    setIncorrect(0);

    setIsPlaying(true);
  }

  function endGame() {
    setIsPlaying(false);
    setHideStartButton(true);
    setTimeout(() => {
      setHideStartButton(false);
    }, 2000);
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

  useEffect(() => {
    if (timer >= maxTime) return endGame();
    if (isPLaying)
      setTimeout(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
  }, [isPLaying, timer]);

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
                  if (validate(n)) setCorrect((prev) => prev + 1);
                  else {
                    setIncorrect((prev) => prev + 1);
                    Swal.fire({
                      timerProgressBar: false,
                      toast: true,
                      position: "top",
                      timer: 1500,
                      showConfirmButton: false,
                      text: "Salah",
                      width: "auto",
                      padding: "0",
                    });
                  }
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
    </main>
  );
};

export default CreaplineUI;
