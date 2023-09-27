import { DateTime } from "luxon";
import moment, { Moment } from "moment-business-days";

export const createDisabledDays = (currentMonthFirstDay: string) => {
  const firstDayCurrentMonth = DateTime.fromSQL(currentMonthFirstDay);
  const firstDayPrevMonth = firstDayCurrentMonth.minus({ month: 1 });
  const firstDayNextMonth = firstDayCurrentMonth.plus({ month: 1 });
  const months = [
    firstDayPrevMonth.toFormat("yyyy-LL-dd"),
    firstDayCurrentMonth.toFormat("yyyy-LL-dd"),
    firstDayNextMonth.toFormat("yyyy-LL-dd"),
  ];
  moment.updateLocale("PL", { workingWeekdays: [1, 2, 3, 4] });

  const dateFormatDaysYear: Moment[] = months?.reduce<Moment[]>(
    (acc, startDate) => [
      ...acc,
      ...moment(startDate, "YYYY-MM-DD").monthBusinessDays(),
    ],
    []
  );

  const formatedToDate = dateFormatDaysYear.map(
    (moment) => new Date(moment.format("YYYY-MM-DD"))
  );

  return formatedToDate;
};

export const disableDays = (
  date: Date,
  view: string,
  viewType: "month" | "year",
  daysArray: Date[],
  conditionValue: boolean
) => {
  if (!conditionValue) {
    return (
      view === viewType &&
      daysArray.some(
        (disabledDate) =>
          date.getFullYear() === disabledDate.getFullYear() &&
          date.getMonth() === disabledDate.getMonth() &&
          date.getDate() === disabledDate.getDate()
      )
    );
  }
  return false;
};
