import Image from "next/image";
import ClockDiff from "./ClockDiff";

const Papaj = () => {
 
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
     
    </>
  );
};

export default Papaj;
