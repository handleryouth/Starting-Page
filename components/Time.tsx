import { useMemo } from "react";
import { format } from "date-fns";
import { TimeResponse } from "../types";

export const Time = ({ datetime, abbreviation }: TimeResponse) => {
  const parsedTime = useMemo(() => {
    return parseInt(format(new Date(datetime), "HH"));
  }, [datetime]);

  return (
    <div className="text-white">
      <div className="flex justify-center items-end">
        <h1 className="text-5xl phone:text-9xl my-0 font-bold">
          {format(new Date(datetime), "HH:mm")}
        </h1>
        <p className="text-2xl">{abbreviation}</p>
      </div>
      <h3 className="mt-4 text-center text-5xl font-bold">
        {parsedTime >= 0 && parsedTime < 12
          ? "Good Morning"
          : parsedTime >= 12 && parsedTime < 18
          ? "Good Afternoon"
          : "Good Evening"}
      </h3>
    </div>
  );
};
