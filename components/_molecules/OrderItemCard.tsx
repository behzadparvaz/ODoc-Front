import { OrderDetailsItemDataModel } from '@utilities/interfaces/order';
import classNames from 'classnames';
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
          <div className="rounded-xl overflow-hidden flex justify-center items-center border border-grey-100">
            <Image
              src={item.image}
              alt="order-details"
              width={68}
              height={68}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <p
              className={classNames(
                'text-md',
                item?.unavaiable && 'text-grey-200',
              )}
            >
              {item.drugName}
            </p>
            <span
              className={classNames(
                'flex items-center text-xs gap-1',
                item?.unavaiable ? 'text-grey-200' : 'text-grey-400',
              )}
            >
              شرکت سازنده:
              <p
                className={classNames(
                  'text-md',
                  item?.unavaiable ? 'text-grey-200' : 'text-grey-800',
                )}
              >
                {item.companyName}
              </p>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-max items-end">
          <span
            className={classNames(
              'text-md flex items-center gap-1',
              item?.unavaiable && 'text-grey-200',
            )}
          >
            {item?.quantity}
            <p
              className={classNames(
                'text-xs',
                item?.unavaiable ? 'text-grey-200' : 'text-grey-400',
              )}
            >
              {item?.quantityType}
            </p>
          </span>
          {item?.unavaiable ? (
            <p className="text-xs text-grey-200">عدم موجودی</p>
          ) : (
            <>
              <span className="text-md flex items-center gap-1">
                {item?.price}
                <p className="text-xs text-grey-400">تومان</p>
              </span>
            </>
          )}
        </div>
      </div>
      {dataLength - 1 !== index && !item?.unavaiable && (
        <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
      )}
    </>
  );
};

export default OrderItemCard;
