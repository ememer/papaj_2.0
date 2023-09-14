"use client";
import Image from "next/image";
import ClockDiff from "./components/ClockDiff";
import ConfettiContainer from "./components/ConfettiContainer";

export default function Home() {
  return (
    <>
      <ConfettiContainer />
      <div className="mx-auto min-h-80-screen flex container">
        <div className="m-auto">
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
        </div>
      </div>
    </>
  );
}
