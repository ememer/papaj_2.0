import CalendarContainer from "../components/CalendarContainer";

import { getCurrentUser } from "@/lib/session";
import { accessedUsers } from "../utils/user";
import { redirect } from "next/navigation";
import { getLatestMeeting, getUserCollection } from "@/lib/actions";
import { MeetingInterface } from "@/common.types";

interface MeetingsCollection {
  meetingsCollection: {
    edges: {
      node: MeetingInterface;
    }[];
  };
}

const Watykan = async () => {
  const session = await getCurrentUser();
  if (!accessedUsers.includes(session?.user?.email)) redirect("/");

  const meetings = (await getLatestMeeting()) as MeetingsCollection;

  const meetingSchedule = meetings?.meetingsCollection?.edges[0]?.node ?? {};

 
  return <CalendarContainer user={session?.user} meetings={meetingSchedule} />;
};

export default Watykan;
