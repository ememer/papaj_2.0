import moment from "moment-business-days";
import { sleep } from "./sleep";
import { getLatestMeeting } from "@/lib/actions";
import { DateTime } from "luxon";
import { MeetingsCollection } from "../watykan/page";

export const getMeetingDate = async <T>(
  stateMessages: React.Dispatch<React.SetStateAction<string>>,
  stateArray: React.Dispatch<React.SetStateAction<T[]>>
) => {
  await sleep(2500);
  stateMessages("Konsultuję daty z wikarym...");
  const meetings = ((await getLatestMeeting()) as MeetingsCollection) ?? "";
  const meetingDayDate = DateTime.fromSQL(
    meetings?.meetingsCollection?.edges[0]?.node?.date as string
  );
  await sleep(3500);
  stateMessages("Zgoda organisty uzyskana 🎉");
  await sleep(2500);

  moment.updateLocale("PL", { workingWeekdays: [5, 6] });
  const momentDaysArray = moment(
    meetingDayDate.toFormat("yyyy-LL-dd"),
    "YYYY-MM-DD"
  ).monthBusinessDays();
  const daysStringArray = momentDaysArray.map((moment) =>
    moment.format("YYYY-MM-DD")
  );
  const arrayLastIndex = daysStringArray.length;
  const isSaturday = meetingDayDate.toFormat("cccc") === "Saturday";
  let avaliableDays;
  if (isSaturday) {
    const saturdayIndex = daysStringArray.findIndex(
      (dateSQL) => dateSQL === meetingDayDate.toFormat("yyyy-LL-dd")
    );
    if (saturdayIndex > 0) {
      avaliableDays = [
        ...daysStringArray.slice(saturdayIndex - 1, arrayLastIndex),
      ];
    } else {
      avaliableDays = [...daysStringArray.slice(saturdayIndex, arrayLastIndex)];
    }
  } else {
    const index = daysStringArray.findIndex(
      (dateSQL) => dateSQL === meetingDayDate.toFormat("yyyy-LL-dd")
    );
    avaliableDays = [...daysStringArray.slice(index, arrayLastIndex)];
  }

  const generateDates = avaliableDays.map((date) => ({
    date: DateTime.fromSQL(date).toFormat("dd-LL-yyyy"),
    day: DateTime.fromSQL(date).setLocale("pl").toFormat("cccc"),
  }));

  stateArray(generateDates as T[]);
};
