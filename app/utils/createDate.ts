import { DateTime } from "luxon";

/**
 *
 * @param startDate ISO string of start date
 * @param endDate ISO string of end date
 * @param dateValue Date string YYYY-MM-DD or DD-MM-YYYY to get formated string DD-MM-YYYY
 * @param localhost Short string of location
 */

export const parseDate = ({
  startDate = "",
  endDate = "",
  dateValue = "",
  location = "pl",
}: {
  startDate?: string;
  endDate?: string;
  dateValue?: string;
  location?: "pl" | string;
}) => {
  const different =
    DateTime.fromISO(endDate as string)
      .diff(DateTime.fromISO(startDate as string), "days")
      .toObject().days ?? 0;

  const ISOString = DateTime.fromISO(dateValue as string).toFormat(
    "dd-LL-yyyy"
  );

  const SQLString = DateTime.fromSQL(dateValue as string).toFormat(
    "dd-LL-yyyy"
  )

  const dayString = DateTime.fromISO(dateValue as string)
    .setLocale(location)
    .toFormat("cccc");

  return {
    different,
    ISOString,
    SQLString,
    dayString,
  };
};
