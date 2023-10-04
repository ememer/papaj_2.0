import { MeetingInterface, SessionInterface } from "@/common.types";
import { fetchToken, handleDelete, updateMeeting } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { parseDate } from "../utils/createDate";
import UserVote from "./UserVote";
import RescheduleMeeting from "./RescheduleMeeting";

interface Props {
  meetings: MeetingInterface;
  user: SessionInterface["user"];
}

const MeetingHeading = ({ meetings, user }: Props) => {
  const router = useRouter();

  const userId = user?.id ?? "";

  return (
    <>
      {meetings && (
        <div className="col-1 order-1 lg:order-2">
          {meetings?.isRescheduled && (
            <div className="w-full text-center my-2 rounded-md shadow-md font-bold animate-pulse bg-gradient-to-br from-yellow-300 from-50% to-50% to-white text-black py-4">
              JAKIŚ PANTOFLARZ CHCE ZMIENIĆ DATĘ
            </div>
          )}
          {meetings?.date && !meetings.isRescheduled && (
            <div className="w-full text-center">
              <h2 className="my-2 text-lg font-bold">Data nowego spotkania:</h2>
              <span className="pt-1 block mx-auto font-semibold">
                {parseDate({ dateValue: meetings?.date as string }).SQLString}
              </span>
              <span className="capitalize font-light">
                {parseDate({ dateValue: meetings?.date as string }).dayString}
              </span>
            </div>
          )}
          {meetings?.range?.every((item) => item !== null) &&
            !meetings?.isRescheduled && (
              <div className="w-full text-center">
                <h2 className="my-2 text-lg font-bold">Papież góry kochoł:</h2>
                <div className="w-full flex">
                  <div className="w-1/3">
                    <span className="pt-1 block mx-auto font-semibold">
                      Dni:
                    </span>
                    <span className="font-light">
                      {parseDate({
                        startDate: meetings?.range?.[0] as string,
                        endDate: meetings.range?.[1] as string,
                      }).different + 1}
                    </span>
                  </div>
                  <div className="w-1/3">
                    <span className="pt-1 block mx-auto font-semibold">
                      {
                        parseDate({ dateValue: meetings?.range?.[0] as string })
                          .ISOString
                      }
                    </span>
                    <span className="capitalize font-light">
                      {
                        parseDate({ dateValue: meetings?.range?.[0] as string })
                          .dayString
                      }
                    </span>
                  </div>
                  <div className="w-1/3">
                    <span className="pt-1 block mx-auto font-semibold">
                      {
                        parseDate({ dateValue: meetings?.range?.[1] as string })
                          .ISOString
                      }
                    </span>
                    <span className="capitalize font-light">
                      {
                        parseDate({ dateValue: meetings?.range?.[1] as string })
                          .dayString
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          {/* {!meetings?.isAnnounced && */}
          {true && user?.email === meetings?.createdBy?.email && (
            <div className="w-full grid grid-cols-2 gap-2 text-gray-800">
              <button
                onClick={async () => {
                  const { token } = await fetchToken();
                  handleDelete(meetings?.id, token);
                  router.refresh();
                }}
                className="w-3/4 mx-auto font-semibold button_warning"
              >
                Anuluj
              </button>
              <button
                onClick={async () => {
                  const { token } = await fetchToken();
                  updateMeeting(meetings?.id, true, [user?.id], null, token);
                  router.refresh();
                }}
                className="w-3/4 mx-auto font-semibold button_success"
              >
                Powiadom
              </button>
            </div>
          )}
          {meetings?.isAnnounced && (
            <>
              <UserVote
                isRescheduled={meetings.isRescheduled}
                userId={user?.id}
                meetingId={meetings?.id}
                usersAccepted={meetings.acceptedBy}
                usersRejected={meetings.rejectedBy}
              />
              {meetings?.rejectedBy?.includes(userId) && (
                <RescheduleMeeting
                  rescheduledDays={meetings?.reschedules?.edges}
                  isRescheduled={meetings?.isRescheduled}
                  userId={userId}
                  meetingId={meetings?.id}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MeetingHeading;
