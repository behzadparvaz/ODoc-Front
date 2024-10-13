import { useGetDrugTypes } from '@api/other/otherApis.rq';
import { ListWithTimer } from '@com/icons';

const QuickOrderItem = ({ data }) => {
  const { data: drugTypes, isLoading } = useGetDrugTypes();
  const handleReturnDrugTypeName = (drugType: number) => {
    return drugTypes?.data?.filter((item) => item?.id === drugType)?.[0]?.name;
  };
  return (
    <div className="flex items-center gap-x-4 border-b border-gray-200 mb-4 pb-4">
      <div className="p-[10px] rounded-full bg-gray-50">
        <ListWithTimer width={20} height={20} fill="black" />
      </div>
      {isLoading === false && (
        <div className="">
          {data?.drugName && <p className="text-sm mb-1"> {data?.drugName}</p>}
          {data?.drugType && (
            <p className="text-sm text-gray-500">
              {handleReturnDrugTypeName(data?.drugType)}
            </p>
          )}
          {data?.drugCount && (
            <p className="text-sm text-gray-500"> {data?.drugCount} عدد</p>
          )}
        </div>
      )}
    </div>
  );
};
export default QuickOrderItem;
