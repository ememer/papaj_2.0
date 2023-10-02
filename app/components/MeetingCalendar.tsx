"use client";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { DateTime } from "luxon";
import { createDisabledDays, disableDays } from "../utils/lockDays";
import { MeetingInterface, SessionInterface } from "@/common.types";
import { createNewMeeting, fetchToken } from "@/lib/actions";
import {  useRouter } from "next/navigation";
import clsx from "clsx";
import MeetingHeading from "./MeetingHeading";
interface Props {
  user: SessionInterface["user"];
  meetings: MeetingInterface;
}

type CalendarType = {
  date: string;
  range: Array<Date | null>;
};

const MeetingCalendar = ({ user, meetings }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPilgrimage, setIsPilgrimage] = useState(false);
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);
  const [defaultDay, setDefaultDay] = useState(
    `${DateTime.now().toFormat("yyyy-LL")}-01`
  );
  const [calendar, setCalendar] = useState<CalendarType>({
    date: "",
    range: [null, null],
  });

  const resetState = () => {
    setCalendar(() => ({
      date: "",
      range: [null, null],
    }));
  };

  const handleSetDayOrRange = (day: Date | string) => {
    if (isPilgrimage) {
      if (calendar.range[0] === null) {
        setCalendar((prevState) => ({
          ...prevState,
          range: [day as Date, null],
        }));
      } else if (
        calendar.range[1] === null &&
        (calendar.range[0] as Date).valueOf() < (day as Date).valueOf()
      ) {
        setCalendar((prevState) => ({
          ...prevState,
          range: [calendar.range[0], day as Date],
        }));
      } else {
        resetState();
      }
    } else {
      resetState();
      setCalendar((prevState) => ({
        ...prevState,
        date: DateTime.fromJSDate(day as Date).toFormat("yyyy-LL-dd"),
      }));
    }
  };

  useEffect(() => {
    const disabledDays = createDisabledDays(defaultDay);
    setDisabledDays(disabledDays);
  }, [defaultDay, isPilgrimage]);

  useEffect(() => {
    resetState();
  }, [isPilgrimage]);

  const handleCreateNewMeeting = async () => {
    const { token } = await fetchToken();
    try {
      setIsLoading(true);
      await createNewMeeting(
        user?.id,
        calendar.date,
        calendar.range[0],
        calendar.range[1],
        token
      );
      router.refresh();
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
      resetState();
      setIsPilgrimage(false);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "grid",
          meetings && Object.keys(meetings).length > 0
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1"
        )}
      >
        <div className="col-1 order-2 lg:order-1">
          <div className="w-full">
            <h1 className="text-center my-2 text-lg font-bold">
              {!isPilgrimage
                ? "Wybierz wizytę w kancelarii:"
                : "Ogłoś termin pielgrzymki:"}
            </h1>
          </div>
          <div className="w-full">
            {disabledDays.length > 0 && (
              <Calendar
                key={isPilgrimage.toString()}
                returnValue={isPilgrimage ? "range" : "start"}
                selectRange={isPilgrimage}
                className="calendar"
                locale="PL"
                onClickDay={(date) => handleSetDayOrRange(date)}
                onActiveStartDateChange={({ activeStartDate }) =>
                  setDefaultDay(
                    DateTime.fromJSDate(activeStartDate as Date).toFormat(
                      "yyyy-LL-dd"
                    )
                  )
                }
                minDate={new Date(DateTime.now().toFormat("yyyy-LL-dd"))}
                tileDisabled={({ date, view }) =>
                  disableDays(date, view, "month", disabledDays, isPilgrimage)
                }
              />
            )}
            {isPilgrimage && (
              <>
                <p className="w-full text-center my-2">
                  {!calendar.range[0] && "Wybierz pierwszy dzień"}
                  {calendar.range[0] &&
                    `Wybrałeś dzień: ${DateTime.fromJSDate(
                      calendar.range[0] as Date
                    ).toFormat("dd-LL-yyyy")}`}
                </p>
                {!calendar.range[1] && calendar.range[0] && (
                  <p className="w-full text-center my-2">
                    {!calendar.range[1] && "Wybierz drugi dzień"}
                  </p>
                )}
                {calendar.range[0] && calendar.range[1] && (
                  <p className="w-full text-center my-2">
                    {calendar.range[1] &&
                      `Wybrałeś dzień: ${DateTime.fromJSDate(
                        calendar.range[1] as Date
                      ).toFormat("dd-LL-yyyy")}`}
                  </p>
                )}
              </>
            )}
            <div className="my-4 w-full flex justify-center items-center">
              <input
                checked={isPilgrimage}
                onChange={() => setIsPilgrimage((prevState) => !prevState)}
                type="checkbox"
                className="w-4 h-4 my-auto cursor-pointer"
                name="Chcę zorganizować pielgrzymkę"
                id="checkboxCalendat"
              />
              <label
                htmlFor="checkboxCalendat"
                className="ms-2 my-auto cursor-pointer"
              >
                Chcę zorganizować pielgrzymkę
              </label>
            </div>
            <button
              disabled={
                (!isPilgrimage && calendar.date === "") ||
                (isPilgrimage && calendar.range.includes(null))
              }
              onClick={() => handleCreateNewMeeting()}
              className={clsx(
                "w-3/4 mx-auto block my-2  rounded-md px-4 py-2",
                (!isPilgrimage && calendar.date === "") ||
                  (isPilgrimage && calendar.range.includes(null))
                  ? "bg-violet-900"
                  : "bg-violet-500"
              )}
            >
              {isLoading ? "Wysyłanie" : "Potwierdź"}
            </button>
          </div>
        </div>
        <MeetingHeading user={user} meetings={meetings} />
      </div>
    </>
  );
};

export default MeetingCalendar;
