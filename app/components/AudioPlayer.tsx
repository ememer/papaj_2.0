"use client";
import AudioPlater from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useEffect, useState } from "react";
import { HOLY_HOUR_STRING, holyHour } from "../utils/holyHour";

const AudioPlayer = () => {
  const [isHoly, setIsHoly] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { timeNow } = holyHour();
      const isHolyHour = timeNow.toFormat("HH:mm").includes(HOLY_HOUR_STRING);
      if (isHolyHour) {
        setIsHoly(isHolyHour);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isHoly]);

  return (
    <>
      {isHoly && (
        <div className="w-full my-6">
          <AudioPlater
            autoPlay={true}
            hasDefaultKeyBindings={true}
            src="https://chillycube.pl/barka/barka.mp3"
          />
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
