import { fetchToken, updateMeeting } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { UserVotes } from "./UserVote";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  userVotes: UserVotes;
  meetingId: string;
  userId: string;
  onClickIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoteButtonsSection = ({
  userVotes,
  meetingId,
  userId,
  onClickIsLoaded,
}: Props) => {
  const [isUserAccepted, setIsUserAccepted] = useState<boolean | true>(true);
  const [isUserRejected, setIsUserRejected] = useState<boolean | true>(true);
  const acceptedList = userVotes?.acceptedBy ?? [];
  const rejectedList = userVotes?.rejectedBy ?? [];
  const router = useRouter();
  useEffect(() => {
    const isUserAccepted = acceptedList?.some(
      (user) => user?.node?.id === userId
    );
    const isUserRejected = rejectedList?.some(
      (user) => user?.node?.id === userId
    );

    setIsUserRejected(isUserAccepted);
    setIsUserAccepted(isUserRejected);
  }, [userVotes.rejectedBy, userVotes.acceptedBy]);

  return (
    <div className="col-span-2 w-full">
      <div
        className={clsx(
          isUserAccepted || isUserRejected ? "grid-cols-1" : "grid-cols-2",
          "grid gap-4"
        )}
      >
        {!isUserAccepted && (
          <button
            className={clsx(
              isUserAccepted && "mx-auto",
              "text-slate-800 w-3/4 font-semibold m-auto text-center button_warning"
            )}
            onClick={async () => {
              const { token } = await fetchToken();
              await updateMeeting(
                meetingId,
                true,
                [
                  ...acceptedList
                    .filter((users) => users?.node?.id !== userId)
                    .map((users) => users?.node?.id),
                ],
                [...rejectedList.map((user) => user?.node?.id), userId],
                token
              ).then(() => {
                onClickIsLoaded(false), router.refresh();
              });
            }}
          >
            {!isUserAccepted ? "Muszę zrezygnować" : "Nie moge"}
          </button>
        )}
        {!isUserRejected && (
          <button
            className={clsx(
              isUserRejected && "mx-auto",
              "w-3/4 text-slate-800 font-semibold m-auto text-center button_success"
            )}
            onClick={async () => {
              const { token } = await fetchToken();
              await updateMeeting(
                meetingId,
                true,
                [...acceptedList.map((user) => user.node.id), userId],
                [
                  ...rejectedList
                    .filter((users) => users?.node?.id !== userId)
                    .map((users) => users?.node?.id),
                ],
                token
              ).then(() => {
                onClickIsLoaded(false), router.refresh();
              });
            }}
          >
            {!isUserRejected ? "Będę, jeszcze jak!" : "Jeszcze jak!"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VoteButtonsSection;
