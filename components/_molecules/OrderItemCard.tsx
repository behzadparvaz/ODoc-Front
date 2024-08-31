import { OrderDetailsItemDataModel } from '@utilities/interfaces/order';
import Image from 'next/image';

type OrderItemCardProps = {
  item: OrderDetailsItemDataModel;
  index: number;
  dataLength: number;
};

const OrderItemCard = ({ item, index, dataLength }: OrderItemCardProps) => {
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-3">
          <div className="rounded-xl overflow-hidden flex justify-center items-center">
            <Image
              src={item.image}
              alt="order-details"
              width={68}
              height={68}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <p className="text-md">{item.drugName}</p>
            <span className="flex items-center text-xs text-grey-400 gap-1">
              شرکت سازنده:
              <p className="text-md text-grey-800">{item.companyName}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-max items-end">
          <span className="text-md flex items-center gap-1">
            {item?.quantity}
            <p className="text-xs text-grey-400">{item?.quantityType}</p>
          </span>
          <span className="text-md flex items-center gap-1">
            {item?.price}
            <p className="text-xs text-grey-400">تومان</p>
          </span>
        </div>
      </div>
      {dataLength - 1 !== index && (
        <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
      )}
    </>
  );
};

export default OrderItemCard;
