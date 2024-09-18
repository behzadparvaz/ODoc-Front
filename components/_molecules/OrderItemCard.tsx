import Image from 'next/image';
import classNames from 'classnames';

import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';
import { convertRialToToman } from '@utilities/mainUtils';

type OrderItemCardProps = {
  item: TenderItemsOrderDataModel;
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
      <div className="flex gap-3 items-center">
        <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
          <Image
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
        <div className="flex flex-col gap-1">
          <p
            className={classNames(
              'text-sm font-medium leading-6',
              isUnavaiable && 'text-grey-400',
            )}
          >
            {item?.productName}
          </p>

          <span
            className={classNames(
              'text-xs leading-5 text-grey-500',
              isUnavaiable && 'text-grey-400',
            )}
          >
            {`${item?.quantity} عدد`}
          </span>
        </div>
      </div>
      <div className="self-end">
        {orderStatus === 'draft' ? (
          <></>
        ) : (
          `${
            isUnavaiable ? (
              <span className="text-xs text-grey-400 leading-5 h-5">
                عدم موجودی
              </span>
            ) : (
              <span className="text-xs leading-5 text-grey-500">{`${convertRialToToman(item?.price)}`}</span>
            )
          }`
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
