import { DateTime } from "luxon";

export const HOLY_HOUR_STRING = "21:37";

export const holyHour = () => {
  const holyHour = DateTime.now().set({
    hour: parseInt(HOLY_HOUR_STRING.split(":")[0]),
    minute: parseInt(HOLY_HOUR_STRING.split(":")[1]),
    second: 0,
    millisecond: 0,
  });

  const holyHourString = holyHour.toFormat("HH:mm");

  const timeNow = DateTime.now();

  const timeNowString = DateTime.now().toFormat("HH:mm");

  const timeNowMillis = timeNow.toMillis();

  let nextHolyHourTime;
  if (timeNowMillis.valueOf() < holyHour.plus({ minute: 1 }).valueOf()) {
    nextHolyHourTime = holyHour;
  } else {
    nextHolyHourTime = holyHour.plus({ day: 1 });
  }

  const clockDiff = nextHolyHourTime.diff(timeNow);
  const clockDiffMillis = clockDiff.toMillis();
  const clockDiffObject = nextHolyHourTime.diff(timeNow, [
    "hours",
    "minutes",
    "seconds",
  ]);

  const secondDiffNumber = parseInt(
    (clockDiffObject.toObject().seconds as number).toFixed(0)
  );

  const ss = secondDiffNumber;
  const mm = clockDiffObject.toObject().minutes;

  const hoursDiff = clockDiffObject.toObject().hours;
  const minutesDiff = (mm as number) < 10 ? `0${mm}` : (mm as number);
  const secondsDiff = (ss as number) < 10 ? `0${ss}` : (ss as number);

  return {
    timeNow,
    timeNowString,
    timeNowMillis,
    holyHour,
    clockDiff,
    clockDiffObject,
    hoursDiff,
    minutesDiff,
    secondsDiff,
    holyHourString,
    clockDiffMillis,
  };
};
