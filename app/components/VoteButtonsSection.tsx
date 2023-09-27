import { fetchToken, updateMeeting } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { UserVotes } from "./UserVote";

interface Props {
  userVotes: UserVotes;
  meetingId: string;
  userId: string;
}

const VoteButtonsSection = ({ userVotes, meetingId, userId }: Props) => {
  const router = useRouter();
  return (
    <div className="col-span-2 w-full">
      <div className="grid grid-cols-2 gap-4">
        <button
          className="w-3/4 text-slate-800 font-semibold m-auto p-2 text-center bg-red-400 rounded-md"
          onClick={async () => {
            const { token } = await fetchToken();
            updateMeeting(
              meetingId,
              true,
              [...userVotes.acceptedBy.map((user) => user?.node?.id), userId],
              [...userVotes.rejectedBy.map((user) => user?.node?.id), userId],
              token
            );
            router.refresh();
          }}
        >
          Nie moge
        </button>
        <button
          className="w-3/4 text-slate-800 font-semibold m-auto p-2 text-center bg-green-400 rounded-md"
          onClick={async () => {
            const { token } = await fetchToken();
            updateMeeting(
              meetingId,
              true,
              [...userVotes.acceptedBy.map((user) => user.node.id), userId],
              [...userVotes.rejectedBy.map((user) => user.node.id), userId],
              token
            );
            router.refresh();
          }}
        >
          Jescze jak!
        </button>
      </div>
      <button className="bg-teal-300 block p-2 m-auto text-slate-800 font-semibold w-3/4 rounded-md my-8">Zaproponuj inny termin</button>
    </div>
  );
};

export default VoteButtonsSection;
