import { DetailChildrenProps } from "types";

const DetailChildren = ({ title, value }: DetailChildrenProps) => {
  return (
    <div className="my-4">
      <h2 className="text-xl">{title}</h2>
      <span>{value}</span>
    </div>
  );
};

export default DetailChildren;
