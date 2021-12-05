interface DetailChildrenProps {
  title: string;
  value: string | number;
}

export const DetailChildren = ({ title, value }: DetailChildrenProps) => {
  return (
    <div className="my-4">
      <h2 className="text-xl">{title.replace("_", "")}</h2>
      <span>{value}</span>
    </div>
  );
};
