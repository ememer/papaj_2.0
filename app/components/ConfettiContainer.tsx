"use Client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { HOLY_HOUR_STRING, holyHour } from "../utils/holyHour";

const ConfettiContainer = () => {
  const [isHoly, setIsHoly] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowDimensions({
        width: innerWidth - 20,
        height: innerHeight - 20,
      });
    };

    if (window !== undefined) {
      window.addEventListener("resize", handleResize);
    }

    const intervalId = setInterval(() => {
      const { timeNow } = holyHour();
      const isHolyHour = timeNow.toFormat("HH:mm").includes(HOLY_HOUR_STRING);

      setIsHoly(isHolyHour);
    }, 1000);
    return () => {
      clearInterval(intervalId), removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isHoly && (
        <div className="w-full">
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true}
          />
        </div>
      )}
    </>
  );
};

export default ConfettiContainer;
