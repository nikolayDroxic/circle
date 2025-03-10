"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Circle = () => {
  const startOfWeek = new Date("2025-03-10T09:00:00").getTime();
  const targetDate = new Date("2025-03-14T18:00:00").getTime();
  const totalDuration = targetDate - startOfWeek;
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(() =>
    formatTime(targetDate - new Date().getTime())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = Math.max(targetDate - now, 0);
      const newProgress = Math.max(
        ((totalDuration - remainingTime) / totalDuration) * 100,
        0
      );

      setProgress(newProgress);
      setTimeLeft(formatTime(remainingTime));

      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, totalDuration]);

  function formatTime(ms: number) {
    if (ms <= 0) {
      setIsTimeUp(true);
      return;
    }

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return (
        <>
          <div>
            {days} <p>days</p>
          </div>
          <div>
            {hours} <p>hours</p>
          </div>{" "}
          <div>
            {minutes} <p>mins</p>
          </div>{" "}
          <div>
            {seconds} <p>seconds</p>
          </div>
        </>
      );
    } else if (hours > 0) {
      return (
        <>
          <div>
            {hours} <p>hours</p>
          </div>{" "}
          <div>
            {minutes} <p>mins</p>
          </div>{" "}
          <div>
            {seconds} <p>seconds</p>
          </div>
        </>
      );
    } else if (minutes > 0) {
      return (
        <>
          <div>
            {minutes} <p>mins</p>
          </div>{" "}
          <div>
            {seconds} <p>seconds</p>
          </div>
        </>
      );
    } else {
      return (
        <div>
          {seconds} <p>seconds</p>
        </div>
      );
    }
  }

  const radius = 360;
  const strokeWidth = 20;
  const totalCircumference = 2 * Math.PI * radius;
  const usableCircumference = totalCircumference - radius;
  const completedLength = (usableCircumference * progress) / 100;
  const uncompletedLength = usableCircumference - completedLength;
  const viewBox = radius * 2 + strokeWidth * 2;
  const c = viewBox / 2;

  return (
    <>
      {!isTimeUp && (
        <div className="wrapper">
          <svg
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            width={radius}
            height={radius}
          >
            <circle
              cx={c}
              cy={c}
              fill="none"
              r={radius}
              strokeWidth={strokeWidth}
              stroke="red"
              strokeDasharray={`${completedLength} ${totalCircumference}`}
              transform={`rotate(120 ${c} ${c})`}
            />
            {progress < 100 && (
              <circle
                className="uncomplete"
                cx={c}
                cy={c}
                fill="none"
                r={radius}
                strokeWidth={strokeWidth}
                stroke="grey"
                strokeDasharray={`${uncompletedLength} ${totalCircumference}`}
                strokeDashoffset={-(completedLength + radius / 2)}
                transform={`rotate(90 ${c} ${c})`}
              />
            )}
          </svg>
          <div className="time-wrapper">{timeLeft}</div>
        </div>
      )}
      {isTimeUp ? (
        <Image
          src="/Rangel.jpeg"
          width={768}
          height={1024}
          alt="Picture of the author"
        />
      ) : (
        <iframe
          width="768"
          height="568"
          src="https://www.youtube.com/embed/iEVqZv_Zjcw"
          title="Kontrol - Nai-Shtastlivia Den (Official Video)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
};

export default Circle;
