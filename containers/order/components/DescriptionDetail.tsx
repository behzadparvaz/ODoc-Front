type DesriptionDetailProps = {
  description?: string;
};

const DescriptionDetail = ({ description }: DesriptionDetailProps) => {
  return (
    <div className="flex flex-col justify-center py-3 px-4">
      <span className="text-md font-semibold">توضیحات</span>
      <span className="text-sm font-normal text-content-secondary">
        {description}
      </span>
    </div>
  );
};

export default DescriptionDetail;
