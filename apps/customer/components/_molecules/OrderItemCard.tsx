import classNames from 'classnames';

import {
  TenderItemsOrderDataModel,
  TenderOrderAltDataModel,
} from '@utilities/interfaces/tender';
import { convertRialToToman } from '@utilities/mainUtils';
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
    <div className="h-[84px] flex gap-2 items-center justify-between py-2">
      <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
        <NextImage
          src={
            item?.imageLink
              ? item?.imageLink
              : '/static/images/staticImages/emptyProduct.png'
          }
          alt="order-details"
          width={68}
          height={68}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p
          className={classNames(
            'text-sm font-medium leading-6',
            isUnavaiable && 'text-grey-400',
          )}
        >
          {item?.productName}
        </p>

        <div className="w-full flex items-center justify-between">
          <span
            className={classNames(
              'text-xs leading-5 text-grey-500',
              isUnavaiable && 'text-grey-400',
            )}
          >
            {`${item?.quantity} عدد`}
          </span>
          {orderStatus === 'draft' ? (
            <></>
          ) : (
            <>
              {isUnavaiable ? (
                <span className="text-xs text-grey-400 leading-5 h-5">
                  عدم موجودی
                </span>
              ) : (
                <span className="text-xs leading-5 text-grey-500">{`${convertRialToToman(item?.price)}`}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
