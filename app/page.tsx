import { getCurrentUser } from "@/lib/session";
import AudioPlayer from "./components/AudioPlayer";
import ConfettiContainer from "./components/ConfettiContainer";
import Papaj from "./components/Papaj";
import { accessedUsers } from "./utils/user";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home() {
  const session = await getCurrentUser();

  const isAccesed = accessedUsers.includes(session?.user?.email);

  return (
    <>
      <ConfettiContainer />
      <div
        className={clsx(
          isAccesed ? "lg:grid flex flex-col lg:grid-col-2" : "flex flex-col",
          "mx-auto min-h-80-screen container"
        )}
      >
        <div className={clsx(isAccesed ? "mx-auto mb-auto mt-16" : "m-auto")}>
          <Papaj />
        </div>
        {isAccesed && (
          <div className="mx-auto mb-auto mt-16 text-center items-center flex flex-col">
            <Link
              href="/watykan"
              title="Przjedź do watykanu"
              className="globe border-4 border-white rounded-full overflow-hidden w-24 h-24 mt-auto"
            >
              <Image
                width={250}
                height={250}
                alt="Służba watykanu"
                className="object-cover h-full w-full"
                src={"/guard.png"}
              />
            </Link>
            <p className="w-3/4 text-2xl py-2 font-light">
              Uzyskano dostęp do Zakrystii
            </p>
          </div>
        )}
        <div className="mx-auto mb-auto mt-2 col-span-2 w-full lg:w-4/6 px-2">
          <AudioPlayer />
        </div>
        {isAccesed && (
          <div className="col-span-2 mx-auto mb-auto mt-16 text-center items-center flex flex-col">
            <Link
              href="/niemajeszczetrasy"
              title="Przjedź do watykanu"
              className="globe border-4 border-white rounded-full overflow-hidden w-24 h-24 mt-auto"
            >
              <Image
                width={250}
                height={250}
                alt="Papaj browar"
                className="object-cover h-full w-full"
                src={"/browar.png"}
              />
            </Link>
            <p className="w-3/4 text-2xl py-2 font-light">
              Wszyscy razem do Papaja
            </p>
          </div>
        )}
      </div>
    </>
  );
}
