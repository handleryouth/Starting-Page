import { useMemo } from "react";
import { format } from "date-fns";
import { TimeResponse } from "types";
import Skeleton from "react-loading-skeleton";

const Time = ({ datetime, abbreviation }: TimeResponse) => {
  const parsedTime = useMemo(() => {
    if (datetime) return parseInt(format(new Date(datetime), "HH"));
  }, [datetime]);

  return (
    <div className="text-white">
      <div className="flex justify-center items-end">
        <h1 className="text-6xl phone:text-9xl my-0 font-bold">
          {datetime ? (
            format(new Date(datetime), "HH:mm")
          ) : (
            <Skeleton className="w-64" />
          )}
        </h1>
        <p className="text-xl ml-2">{abbreviation || <Skeleton />}</p>
      </div>
      <h3 className="mt-4 text-center text-4xl phone:text-5xl font-bold">
        {parsedTime ? (
          parsedTime >= 0 && parsedTime < 12 ? (
            "Good Morning"
          ) : parsedTime >= 12 && parsedTime < 18 ? (
            "Good Afternoon"
          ) : (
            "Good Evening"
          )
        ) : (
          <Skeleton />
        )}
      </h3>
    </div>
  );
};

export default Time;
