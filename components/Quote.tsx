import { QuotesResponse } from "types";
import Skeleton from "react-loading-skeleton";

const Quote = ({ content, author }: QuotesResponse) => {
  return (
    <div className="text-white text-center mt-4 flex flex-col justify-center items-center">
      <p className="text-lg phone:text-2xl w-5/6 phone:w-3/4">
        {content ? `"${content}"` : <Skeleton />}
      </p>
      <p className="text-sm font-bold phone:text-lg mt-2">
        {author ? `- ${author}` : <Skeleton className="w-64" />}
      </p>
    </div>
  );
};

export default Quote;
