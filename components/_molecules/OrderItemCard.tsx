import {
  TenderItemsOrderDataModel,
  TenderOrderAltDataModel,
} from '@utilities/interfaces/tender';
import { convertRialToToman } from '@utilities/mainUtils';
import NextImage from '@com/_core/NextImage';
import { DangerIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';

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
      {isUnavaiable ? (
        <div className="flex h-14 bg-yellow-50 items-center px-3 rounded-lg">
          <DangerIcon width={22} height={22} fill={colors.yellow[500]} />
          <p className="text-grey-600 text-sm mr-3">
            این کالا در این داروخانه ناموجود است.
          </p>
        </div>
      ) : null}
      <div
        className={`h-max min-h-[78px] grid grid-cols-[64px_1fr] gap-2 items-center justify-between pb-2 ${isUnavaiable ? 'opacity-60' : ' '} `}
      >
        <div className="col-start-1 col-end-2 flex justify-center items-center">
          <div className="w-[40px] h-[40px] rounded-xl overflow-hidden flex justify-center items-center">
            <NextImage
              src={
                item?.imageLink
                  ? item?.imageLink
                  : '/static/images/staticImages/emptyProduct.png'
              }
              alt="order-details"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="col-start-2 col-end-3 flex flex-col gap-1 w-full">
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
                'text-xs leading-5 text-content-tertiary',
                isUnavaiable && 'text-content-disabled',
              )}
            >
              {`${item?.quantity} عدد`}
            </span>
            {orderStatus === 'draft' ? (
              <></>
            ) : (
              <>
                {isUnavaiable ? (
                  <span className="text-xs text-content-disabled leading-5 h-5">
                    عدم موجودی
                  </span>
                ) : (
                  <span className="text-xs leading-5">{`${item?.price ? convertRialToToman(item?.price) : ''}`}</span>
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
