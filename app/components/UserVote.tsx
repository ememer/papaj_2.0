import { UserPorifileCollection } from "@/common.types";
import { fetchToken, getUserCollection, updateMeeting } from "@/lib/actions";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VoteButtonsSection from "./VoteButtonsSection";
interface Props {
  userId: string;
  meetingId: string;
  usersAccepted: Array<string>;
  usersRejected: Array<string>;
}

export interface UserVotes {
  acceptedBy: UserPorifileCollection["userCollection"]["edges"];
  rejectedBy: UserPorifileCollection["userCollection"]["edges"];
}

const UserVote = ({
  userId,
  meetingId,
  usersAccepted,
  usersRejected,
}: Props) => {
  const [userVotes, setUserVotes] = useState<UserVotes>({
    acceptedBy: [],
    rejectedBy: [],
  });
  const router = useRouter();
  console.log(userVotes);
  useEffect(() => {
    const getUserVotes = async () => {
      const responseAccepted = (await getUserCollection(
        usersAccepted ?? []
      )) as UserPorifileCollection;
      const responseRejected = (await getUserCollection(
        usersRejected ?? []
      )) as UserPorifileCollection;

      setUserVotes({
        acceptedBy: responseAccepted?.userCollection?.edges ?? [],
        rejectedBy: responseRejected?.userCollection?.edges ?? [],
      });
    };

    getUserVotes();
  }, [usersAccepted, usersRejected]);

  return (
    <div className="w-full grid grid-cols-2 gap-4 my-4">
      <div className="col-1 text-center">
        {userVotes.rejectedBy && (
          <div>
            {userVotes.rejectedBy?.map((user, idx) => (
              <div
                key={user?.node?.id + idx}
                className={clsx(
                  idx === 0 && "me-10",
                  idx > 0 && `-right-${idx * 2} relative`,
                  "h-8 w-8 rounded-full inline-block border-2 border-white overflow-hidden"
                )}
              >
                <Image
                  width={96}
                  height={96}
                  aria-label="Zdjęcię"
                  className="w-full h-full object-contain"
                  alt="Zdjęcie profilowe"
                  src={userVotes.acceptedBy?.[0]?.node?.avatarUrl}
                />
              </div>
            ))}
          </div>
        )}
        <p className="w-full font-bold text-center">Nie mogę 😟</p>
        <ul>
          {userVotes.rejectedBy?.map((user) => (
            <li
              className="flex items-center justify-center flex-row"
              key={user?.node?.id}
            >
              <span className="block me-2 text-xs">❌</span>
              {user?.node?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-1 text-center">
        {userVotes.acceptedBy && (
          <div>
            {userVotes.acceptedBy?.map((user, idx) => (
              <div
                key={user?.node?.id + idx}
                className={clsx(
                  idx === 0 && "ms-10",
                  idx > 0 && `-left-${idx * 2} relative`,
                  "h-8 w-8 rounded-full inline-block border-2 border-white overflow-hidden"
                )}
              >
                <Image
                  width={96}
                  height={96}
                  aria-label="Zdjęcię"
                  className="w-full h-full object-contain"
                  alt="Zdjęcie profilowe"
                  src={userVotes.acceptedBy?.[0]?.node?.avatarUrl}
                />
              </div>
            ))}
          </div>
        )}
        <p className="w-full font-bold text-center">Jeszcze jak!</p>
        <ul className="decoration-clone">
          {userVotes.acceptedBy?.map((user) => (
            <li
              className="flex items-center justify-center flex-row"
              key={user?.node?.id}
            >
              <span className="block me-2 text-2xl">🍻</span>
              {user?.node?.name}
            </li>
          ))}
        </ul>
      </div>
      <VoteButtonsSection
        meetingId={meetingId}
        userVotes={userVotes}
        userId={userId}
      />
    </div>
  );
};

export default UserVote;
