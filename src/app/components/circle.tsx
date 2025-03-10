"use client";

import React, { useEffect, useState } from "react";

const Circle = () => {
  const startOfWeek = new Date("2025-03-10T09:00:00").getTime();
  const targetDate = new Date("2025-03-14T18:00:00").getTime();
  const totalDuration = targetDate - startOfWeek;

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
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [targetDate, totalDuration]);

  function formatTime(ms: any) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
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
    <div className="wrapper">
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        xmlns="http://www.w3.org/2000/svg"
        width={radius}
        height={radius}
      >
        <circle
          className="complete"
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
      <p className="time">{timeLeft} </p>
    </div>
  );
};

export default Circle;
