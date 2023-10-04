import Image from "next/image";

export default function Custom404() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col text-black">
      <div className="w-full">
        <Image
          src={"/404.png"}
          height={250}
          width={250}
          alt="404"
          className="mx-auto"
        />
      </div>
      <h1 className="my-4 font-bold text-5xl text-center w-full ">NOT FOUND</h1>
    </div>
  );
}
