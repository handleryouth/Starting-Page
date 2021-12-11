import { SetStateAction, useState } from "react";
import DetailChildren from "./DetailChildren";
import { TimeResponse } from "../../types";

interface DetailProps extends TimeResponse {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Detail = ({
  timezone,
  day_of_year,
  day_of_week,
  week_number,
  setOpen,
  open,
}: DetailProps) => {
  const [renderCount, setRenderCount] = useState<number>(0);

  return (
    <div
      className={`
      ${open && "translate-x-full "} 
      absolute z-20 h-screen min-h-160 w-72 bg-black sm:bg-opacity-50 right-full duration-150 ${
        renderCount > 0 && "duration-150"
      }`}
    >
      <p
        className="text-white w-full text-right px-8 text-4xl cursor-pointer h-1/4"
        onClick={() => {
          setRenderCount((prevState) => prevState + 1);
          setOpen((prevState) => !prevState);
        }}
      >
        x
      </p>
      <div className=" text-white flex flex-col h-3/4 px-4">
        <DetailChildren title="CURRENT TIMEZONE" value={timezone} />
        <DetailChildren title="DAY OF THE YEAR" value={day_of_year} />
        <DetailChildren title="DAY OF THE WEEK" value={day_of_week + 1} />
        <DetailChildren title="WEEK NUMBER" value={week_number} />
      </div>
    </div>
  );
};

export default Detail;
