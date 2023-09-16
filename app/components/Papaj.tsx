"use client";
import Image from "next/image";
import ClockDiff from "./ClockDiff";
import AudioPlater from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useEffect, useState } from "react";
const Papaj = () => {
  const [test, setTest] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setTest(true);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="globe rounded-full flex-1 flex-start overflow-hidden w-24 h-24 bg-white mx-auto border-white border-4 shadow-md">
        <Image
          src="/papaj.png"
          alt="Papaj"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <ClockDiff />
      </div>
      {test && (
        <AudioPlater
          autoPlay={true}
          src="https://chillycube.pl/barka/barka.mp3"
        ></AudioPlater>
      )}
    </>
  );
};

export default Papaj;
