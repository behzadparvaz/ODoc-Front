import { useGetActiveOrderStatus } from '@api/order/orderApis.rq';
import { TimerIcon } from '@com/icons';
import { colors } from '@configs/Theme';

// useGetActiveOrderStatus
const QuickOrderStatus = ({ className = '' }) => {
  const { data, isLoading } = useGetActiveOrderStatus();
  console.log(data);
  const orderStatus = data?.data;
  console.log(orderStatus);

  return (
    <div className={`w-full ${className}`}>
      <div className=" flex justify-center">
        <span className="bg-yellow-50 inline-block p-1.5 rounded-full ">
          <TimerIcon width="20" height="20" fill={colors?.yellow[400]} />
        </span>
      </div>
    </div>
  );
};
export default QuickOrderStatus;
