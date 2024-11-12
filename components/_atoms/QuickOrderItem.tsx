import { useDeleteOrderDetail } from '@api/order/orderApis.rq';
import { useGetDrugTypes } from '@api/other/otherApis.rq';
import { ListWithTimer, TrushIcon } from '@com/icons';
import { useState } from 'react';

interface props {
  data: any;
  hasDelete?: boolean;
  handleCheckDelete?: () => void;
}

const QuickOrderItem = ({
  data,
  hasDelete = false,
  handleCheckDelete,
}: props) => {
  const { data: drugTypes, isLoading } = useGetDrugTypes();
  const handleReturnDrugTypeName = (drugType: number) => {
    return drugTypes?.data?.filter((item) => item?.id === drugType)?.[0]?.name;
  };
  const [showStatus, setShowStatus] = useState(true);
  const { mutate } = useDeleteOrderDetail();
  const handleDelete = () => {
    mutate(data?.uuid, {
      onSuccess: () => {
        setShowStatus(false);
        handleCheckDelete();
      },
    });
  };
  return (
    <div
      className={`${showStatus ? 'flex' : 'hidden'} items-center gap-x-4 border-b border-gray-200 mb-4 pb-4`}
    >
      <div className="p-[10px] rounded-full bg-gray-50">
        <ListWithTimer width={20} height={20} fill="black" />
      </div>
      {isLoading === false && (
        <div className="flex justify-between w-full items-center">
          <div className="">
            {data?.drugName && (
              <p className="text-xs mb-1"> {data?.drugName}</p>
            )}
            {data?.drugType && (
              <p className="text-xs text-gray-500">
                {handleReturnDrugTypeName(data?.drugType)}
              </p>
            )}
            {data?.drugCount && (
              <p className="text-xs text-gray-500"> {data?.drugCount} عدد</p>
            )}
          </div>
          {hasDelete && (
            <span onClick={handleDelete}>
              <TrushIcon width={20} height={20} fill="red" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default QuickOrderItem;
