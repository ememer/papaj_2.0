"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { HOLY_HOUR_STRING, holyHour } from "../utils/holyHour";

const ConfettiContainer = () => {
  const [isHoly, setIsHoly] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    const { innerWidth, innerHeight } = window;
    setWindowDimensions({
      width: innerWidth - 1,
      height: innerHeight - 1,
    });
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { timeNow } = holyHour();
      const isHolyHour = timeNow.toFormat("HH:mm").includes(HOLY_HOUR_STRING);
      if (!isHoly && isHolyHour) {
        setIsHoly(isHolyHour);
      } else if (isHoly && !isHolyHour) {
        setIsHoly(isHolyHour);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isHoly]);

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleResize);
    }
    return () => removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  return (
    <div className="w-full">
      {isHoly && (
        <>
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true}
          />
        </>
      )}
    </div>
  );
};

export default ConfettiContainer;
