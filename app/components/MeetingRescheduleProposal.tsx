import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { sleep } from "../utils/sleep";
import { fetchToken, updateVotes } from "@/lib/actions";
import { useRouter } from "next/navigation";

const MeetingRescheduleProposal = ({
  date,
  day,
  buttonsEnable,
  votes,
  rescheduleId,
  userId,
}: {
  date: string;
  day: string;
  buttonsEnable: boolean;
  votes?: string[];
  rescheduleId?: string;
  userId?: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [votesQty, setVotesQty] = useState(votes?.length ?? 0);
  const router = useRouter();

  useEffect(() => {
    const runPing = async () => {
      await sleep(1000);
      setIsClicked(false);
    };
    if (isClicked) {
      runPing();
    }
  }, [isClicked]);

  useEffect(() => {
    if ((votes?.length as number) > 0) {
      setVotesQty(votes?.length as number);
    }
  }, [votes?.length]);

  return (
    <div className="p-4 w-2/4 mx-auto text-center">
      <p className="w-full p-2 font-bold">{date}</p>
      <p className="w-full font-semibold capitalize">{day}</p>
      {buttonsEnable && (
        <button
          onClick={async () => {
            const { token } = await fetchToken();
            await updateVotes(
              token,
              rescheduleId as string,
              [...(votes as string[]), userId] as string[]
            ).finally(() => {
              setIsClicked(true), router.refresh();
            });
          }}
          className={clsx(
            isClicked && "animate-ping",
            "button_action block mx-auto my-4 !rounded-full relative"
          )}
        >
          🍻
          {votesQty !== 0 ? (
            <span className="text-amber-400 absolute -bottom-4 -right-4 flex items-center justify-center  w-8 h-8 bg-white rounded-full">
              +{votes?.length}
            </span>
          ) : null}
        </button>
      )}
    </div>
  );
};

export default MeetingRescheduleProposal;
