import format from "date-fns/format";
import getHours from "date-fns/getHours";
import { useCallback } from "react";

interface TimeProps {
  date: Date;
}

const Time = ({ date }: TimeProps) => {
  let hours = getHours(date);

  const greetingSelection = useCallback(() => {
    if (hours >= 0 && hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }, [hours]);

  return (
    <div className="text-white">
      <h1 className="text-6xl phone:text-9xl my-0 font-bold">
        {format(date, "HH:mm")}
      </h1>

      <h3 className="mt-4 text-center text-4xl phone:text-5xl font-bold">
        {greetingSelection()}
      </h3>
    </div>
  );
};

export default Time;
