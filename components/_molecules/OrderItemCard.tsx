import { OrderDetailsItemDataModel } from '@utilities/interfaces/order';
import classNames from 'classnames';
import Image from 'next/image';

type OrderItemCardProps = {
  item: OrderDetailsItemDataModel;
};

const OrderItemCard = ({ item }: OrderItemCardProps) => {
  return (
    <div className="h-[84px] flex gap-2 items-center justify-between ">
      <div className="flex gap-3 items-center">
        <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
          <Image src={item?.image} alt="order-details" width={68} height={68} />
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={classNames(
              'text-sm font-medium leading-6',
              item?.unavaiable && 'text-grey-400',
            )}
          >
            {item?.drugName}
          </p>
          <span
            className={classNames(
              'flex items-center text-xs leading-5 gap-1',
              item?.unavaiable ? 'text-grey-400' : 'text-grey-500',
            )}
          >
            {`شرکت سازنده: ${item?.companyName}`}
          </span>
          <span
            className={classNames(
              'text-xs leading-5 text-grey-500',
              item?.unavaiable && 'text-grey-400',
            )}
          >
            {`${item?.quantity} ${item?.quantityType}`}
          </span>
        </div>
      </div>
      <div className="self-end">
        {item?.unavaiable ? (
          <span className="text-xs text-grey-400 leading-5 h-5">
            عدم موجودی
          </span>
        ) : (
          <span className="text-xs leading-5 text-grey-500">{`${item?.price} تومان`}</span>
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
