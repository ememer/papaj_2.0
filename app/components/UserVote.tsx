import { UserPorifileCollection } from "@/common.types";
import { getUserCollection } from "@/lib/actions";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import VoteButtonsSection from "./VoteButtonsSection";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  meetingId: string;
  usersAccepted: Array<string>;
  usersRejected: Array<string>;
  isRescheduled: boolean;
}

export interface UserVotes {
  acceptedBy: UserPorifileCollection["userCollection"]["edges"] | null;
  rejectedBy: UserPorifileCollection["userCollection"]["edges"] | null;
}

const UserVote = ({
  userId,
  meetingId,
  usersAccepted,
  usersRejected,
  isRescheduled,
}: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userVotes, setUserVotes] = useState<UserVotes>({
    acceptedBy: null,
    rejectedBy: null,
  });

  useEffect(() => {}, [usersAccepted, usersRejected]);

  const getUserVotes = async (
    acceptedUsers: string[],
    rejectedUsers: string[]
  ) => {
    Promise.all([
      (await getUserCollection(acceptedUsers ?? [])) as UserPorifileCollection,
      (await getUserCollection(rejectedUsers ?? [])) as UserPorifileCollection,
    ])
      .then(([acceptedResponse, rejectedResponse]) => {
        setUserVotes({
          acceptedBy: acceptedResponse?.userCollection?.edges,
          rejectedBy: rejectedResponse?.userCollection?.edges,
        });
        setIsLoaded(true);
      })
      .finally(() => {
        router.refresh();
      });
  };

  useEffect(() => {
    if (!isLoaded) {
      getUserVotes(usersAccepted, usersRejected);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      getUserVotes(usersAccepted, usersRejected);
    }
  }, [usersAccepted, usersRejected]);

  return (
    <>
      {!isRescheduled && (
        <div className="w-full grid grid-cols-2 gap-4 my-4">
          <div className="col-1 text-center">
            {userVotes?.rejectedBy && userVotes?.rejectedBy.length > 0 && (
              <>
                <div>
                  {userVotes?.rejectedBy?.map((user, idx) => (
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
                        src={userVotes?.rejectedBy?.[0]?.node?.avatarUrl ?? ""}
                      />
                    </div>
                  ))}
                </div>
                <p className="w-full font-bold text-center">Nie mogę 😟</p>
              </>
            )}
            <ul>
              {userVotes?.rejectedBy?.map((user) => (
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
            {userVotes?.acceptedBy && userVotes?.acceptedBy?.length > 0 && (
              <>
                <div>
                  {userVotes?.acceptedBy?.map((user, idx) => (
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
                        src={userVotes?.acceptedBy?.[0]?.node?.avatarUrl ?? ""}
                      />
                    </div>
                  ))}
                </div>
                <p className="w-full font-bold text-center">Jeszcze jak!</p>
              </>
            )}
            <ul className="decoration-clone">
              {userVotes?.acceptedBy?.map((user) => (
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
          {isLoaded && (
            <VoteButtonsSection
              onClickIsLoaded={setIsLoaded}
              meetingId={meetingId}
              userVotes={userVotes}
              userId={userId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserVote;
