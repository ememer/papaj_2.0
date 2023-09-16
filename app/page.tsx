"use client";
import ConfettiContainer from "./components/ConfettiContainer";
import Papaj from "./components/Papaj";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <ConfettiContainer />
      <div className="mx-auto min-h-80-screen flex container">
        <div className="m-auto">
          <Papaj />
        </div>
      </div>
    </>
  );
}
