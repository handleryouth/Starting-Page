import Skeleton from "react-loading-skeleton";
import { DetailChildrenProps } from "types";

const DetailChildren = ({ title, value }: DetailChildrenProps) => {
  return (
    <div className="my-4">
      <h2 className="text-xl">{title.replace("_", "") || <Skeleton />}</h2>
      <span>{value || <Skeleton />}</span>
    </div>
  );
};

export default DetailChildren;
