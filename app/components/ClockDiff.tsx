"use client";

import { useState, useEffect } from "react";
import React from "react";
import { HOLY_HOUR_STRING, holyHour } from "../utils/holyHour";

const ClockDiff = () => {
  const [isHolyHour, setIsHolyHour] = useState(false);
  const [clockDiffMillis, setClockDiffMillis] = useState(86400000);
  const [clockDiff, setClockDiff] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const {
        hoursDiff,
        minutesDiff,
        secondsDiff,
        timeNowString,
        clockDiffMillis,
      } = holyHour();

      if (timeNowString.includes(HOLY_HOUR_STRING)) {
        setIsHolyHour(true);
      } else {
        setClockDiff(`${hoursDiff}:${minutesDiff}:${secondsDiff}`);
        setIsHolyHour(false);
      }

      setClockDiffMillis(clockDiffMillis);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeInPercentage = () => {
    return (100 - (clockDiffMillis * 100) / 86400000).toFixed(2);
  };

  return (
    <>
      {isHolyHour && (
        <h1 className="text-center mt-4 text-5xl font-semibold">
          {holyHour().holyHourString}
        </h1>
      )}
      {!isHolyHour && (
        <>
          <p className="w-full text-center mt-4 text-2xl font-light uppercase">
            {`Do barki pozostało `}
          </p>
          <span className="inline-block text-center w-full font-bold text-4xl">
            {clockDiff}
          </span>
          <div className="w-full bg-gray-900/50 shadow-sm rounded-md h-8 overflow-hidden mx-auto">
            <span
              style={{ width: `${timeInPercentage()}%` }}
              className="h-8 bg-yellow-300 w-1/2 inline-block"
            />
          </div>
          <div className="text-center">
            <code className="text-white-200">{`${timeInPercentage()}%`}</code>
          </div>
        </>
      )}
    </>
  );
};

export default ClockDiff;
