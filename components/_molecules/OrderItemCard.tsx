import classNames from 'classnames';

import {
  TenderItemsOrderDataModel,
  TenderOrderAltDataModel,
} from '@utilities/interfaces/tender';
import { convertRialToTomanNumber } from '@utilities/mainUtils';
import NextImage from '@com/_core/NextImage';

type OrderItemCardProps = {
  item: TenderItemsOrderDataModel | TenderOrderAltDataModel;
  isUnavaiable?: boolean;
  dataLength?: number;
  orderStatus?: string;
};

const OrderItemCard = ({
  item,
  isUnavaiable,
  orderStatus,
}: OrderItemCardProps) => {
  return (
    <>
      <div
        className={`h-max min-h-[78px] grid grid-cols-[64px_1fr] gap-2 items-center justify-between pb-2 ${isUnavaiable ? 'opacity-60' : ' '} `}
      >
        <div className="col-start-1 col-end-2 flex justify-center items-center">
          <div className="w-[40px] h-[40px] rounded-xl overflow-hidden flex justify-center items-center">
            <NextImage
              src={
                item?.imageLink ? item?.imageLink : '/images/emptyProduct.png'
              }
              alt="order-details"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="col-start-2 col-end-3 flex items-center justify-between gap-1 w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <p
              className={classNames(
                'text-xs font-medium leading-6 line-clamp-2',
                isUnavaiable && 'text-grey-400',
              )}
            >
              {item?.productName}
            </p>
            <span
              className={classNames(
                'text-2xs leading-5 text-content-tertiary',
                isUnavaiable && 'text-content-disabled',
              )}
            >
              {`${item?.quantity} ${item?.unit}`}
            </span>
          </div>

          <div className="min-w-max flex items-center justify-between">
            {orderStatus === 'draft' ? (
              <></>
            ) : (
              <>
                {isUnavaiable ? (
                  <span className="text-xs text-content-disabled leading-5 h-5">
                    عدم موجودی
                  </span>
                ) : (
                  <span className="text-sm font-medium leading-5">
                    {item?.price ? convertRialToTomanNumber(item?.price) : ''}
                    <span className="text-xs"> تومان</span>
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemCard;
