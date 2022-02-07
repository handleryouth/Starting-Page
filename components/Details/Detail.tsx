import { useCallback, useState } from "react";
import { DetailProps } from "types";
import DetailChildren from "./DetailChildren";

const Detail = ({ setOpen, open, date }: DetailProps) => {
  const [renderCount, setRenderCount] = useState<number>(0);

  const getWeekNumber = useCallback(() => {
    let oneJan = new Date(date.getFullYear(), 0, 1);
    let numberOfDays = Math.floor(
      (Number(date) - Number(oneJan)) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  }, [date]);

  return (
    <div
      className={`
      ${open && "translate-x-full "} 
      absolute z-20 h-screen min-h-160 w-72 bg-black sm:bg-opacity-50 right-full duration-150 ${
        renderCount > 0 && "duration-150"
      }`}
    >
      <p
        className="text-white w-full text-right px-8 text-3xl cursor-pointer h-1/4"
        onClick={() => {
          setRenderCount((prevState) => prevState + 1);
          setOpen((prevState) => !prevState);
        }}
      >
        x
      </p>
      <div className=" text-white flex flex-col h-3/4 px-4">
        <DetailChildren
          title="CURRENT TIMEZONE"
          value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        <DetailChildren
          title="DAY OF THE YEAR"
          value={new Date().getFullYear()}
        />
        <DetailChildren
          title="DAY OF THE WEEK"
          value={new Date().getDay() + 1}
        />
        <DetailChildren title="WEEK NUMBER" value={getWeekNumber()} />
      </div>
    </div>
  );
};

export default Detail;
