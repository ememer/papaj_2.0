import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { sleep } from "../utils/sleep";

const MeetingRescheduleProposal = ({
  date,
  day,
  buttonsEnable,
  votes,
  rescheduleId,
}: {
  date: string;
  day: string;
  buttonsEnable: boolean;
  votes?: string[];
  rescheduleId?: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const runPing = async () => {
      await sleep(1000);
      setIsClicked(false);
    };
    if (isClicked) {
      runPing();
    }
  }, [isClicked]);

  return (
    <div className="p-4 w-2/4 mx-auto text-center">
      <p className="w-full p-2 font-bold">{date}</p>
      <p className="w-full font-semibold capitalize">{day}</p>
      {buttonsEnable && (
        <button
          onClick={() => setIsClicked(true)}
          className={clsx(
            isClicked && "animate-ping",
            "button_action block mx-auto my-4 !rounded-full"
          )}
        >
          🍻
        </button>
      )}
    </div>
  );
};

export default MeetingRescheduleProposal;
