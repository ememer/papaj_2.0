import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  createReschedulesVotes,
  fetchToken,
  updateMeetingWithReschedule,
} from "@/lib/actions";
import MeetingRescheduleProposal from "./MeetingRescheduleProposal";
import { getMeetingDate } from "../utils/generateMeetingVoteDates";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import { MeetingInterface } from "@/common.types";

const DEF_MESSAGE = "Sprawdzam księgi wieczyste...";

interface AvaliableDays {
  date: string;
  day: string;
  votes?: string[];
  rescheduleId?: string;
}

const RescheduleMeeting = ({
  isRescheduled,
  meetingId,
  rescheduledDays,
}: {
  rescheduledDays: MeetingInterface["reschedules"]["edges"];
  isRescheduled: boolean;
  meetingId: string;
}) => {
  const router = useRouter();
  const [rescheduleProposa, setRescheduleProposal] = useState(false);
  const [generateDates, setGenerateDates] = useState(false);
  const [message, setMessage] = useState(DEF_MESSAGE);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avaliableGeneratedDates, setAvaliableGeneratedDates] = useState<
    AvaliableDays[]
  >([]);

  useEffect(() => {
    if (generateDates) {
      setAvaliableGeneratedDates([]);
      setMessage(DEF_MESSAGE);
      getMeetingDate<AvaliableDays>(setMessage, setAvaliableGeneratedDates);
    } else {
      setMessage(DEF_MESSAGE);
      setAvaliableGeneratedDates([]);
    }
  }, [generateDates]);

  useEffect(() => {
    if (isRescheduled) {
      setAvaliableGeneratedDates(
        rescheduledDays?.map<AvaliableDays>((date) => ({
          date: date?.node?.date as string,
          day: DateTime.fromISO(
            DateTime.fromFormat(date?.node?.date, "dd-LL-yyyy").toFormat(
              "yyyy-LL-dd"
            ) as string
          )
            .setLocale("pl")
            .toFormat("cccc"),
          votes: [],
          rescheduleId: date?.node?.id,
        }))
      );
    }
  }, []);

  const isGenerated = generateDates && avaliableGeneratedDates.length !== 0;
  const isRescheduledVotes =
    isRescheduled && avaliableGeneratedDates.length !== 0;

  return (
    <>
      {generateDates && avaliableGeneratedDates.length === 0 && (
        <div className="flex flex-col py-4">
          <Image
            className="mx-auto globe rounded-full block animate-bounce border-2 border-white w-12 h-12"
            alt="Papj"
            width={150}
            height={150}
            src="/papaj.png"
          />
          <p className="font-semibold text-lg mx-auto block p-2 animate-pulse">
            {message}
          </p>
        </div>
      )}
      {(isGenerated || isRescheduledVotes) && (
        <div className="flex flex-wrap">
          {avaliableGeneratedDates.map((dates) => (
            <MeetingRescheduleProposal
              key={dates.date}
              date={dates.date}
              day={dates.day}
              buttonsEnable={isRescheduled}
              votes={dates?.votes}
              rescheduleId={dates?.rescheduleId}
            />
          ))}
        </div>
      )}
      {avaliableGeneratedDates.length !== 0 && !isRescheduled && (
        <button
          onClick={async () => {
            setIsUpdating(true);
            const { token } = await fetchToken();
            await createReschedulesVotes(
              token,
              meetingId,
              avaliableGeneratedDates.map((date) => date.date)
            );
            await updateMeetingWithReschedule(meetingId, token).finally(() => {
              setIsUpdating(false), router.refresh();
            });
          }}
          className="block m-auto text-slate-800 font-semibold w-3/4 my-8 button_success"
        >
          {!isUpdating ? "Rozpocznij głosowanie" : "Inicuje głosowanie..."}
        </button>
      )}
      <button
        onClick={() => {
          setRescheduleProposal((prevState) => !prevState);
          setGenerateDates((prevState) => !prevState);
        }}
        className={clsx(
          rescheduleProposa ? "button_warning" : "button_action",
          "block m-auto text-slate-800 font-semibold w-3/4 my-8 "
        )}
      >
        {rescheduleProposa ? "Jednak się rozmyśliłem" : "Veto! Inny termin"}
      </button>
    </>
  );
};

export default RescheduleMeeting;
