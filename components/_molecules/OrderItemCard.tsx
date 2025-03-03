import classNames from 'classnames';

import {
  TenderItemsOrderDataModel,
  TenderOrderAltDataModel,
} from '@utilities/interfaces/tender';
import { convertRialToTomanNumber } from '@utilities/mainUtils';
import NextImage from '@com/_core/NextImage';
import useProductNavigation from '@hooks/useNavigateToPdp';

type OrderItemCardProps = {
  item: TenderItemsOrderDataModel | TenderOrderAltDataModel;
  isUnavaiable?: boolean;
  dataLength?: number;
  orderStatus?: string;
  isAlternative?: boolean;
  discountPercentage?: number;
};

const OrderItemCard = ({
  item,
  isUnavaiable,
  orderStatus,
  isAlternative,
  discountPercentage,
}: OrderItemCardProps) => {
  const { navigateToPdp } = useProductNavigation();

  return (
    <>
      <div
        className={`h-max min-h-[78px] grid grid-cols-[64px_1fr] gap-2 items-center justify-between pb-2 cursor-pointer ${isUnavaiable ? 'opacity-60' : ' '} `}
        onClick={() =>
          navigateToPdp({
            item: item,
            ProductTypeId: item?.type?.id,
          })
        }
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

            <span className="text-[9px] text-content-tertiary">
              {item?.description}
            </span>

            <span
              className={classNames(
                'text-2xs leading-5 text-content-tertiary',
                isUnavaiable && 'text-content-disabled',
              )}
            >
              {`${item?.quantity} ${item?.unit ? item?.unit : 'عدد'}`}
            </span>
          </div>

          <div className="min-w-max flex items-center justify-between">
            {orderStatus === 'draft' ? (
              <></>
            ) : (
              <>
                {isUnavaiable ? (
                  <span className="text-xs leading-5 h-6 rounded-full bg-surface-negativeLight text-content-negative px-2 py-1 flex items-center">
                    عدم موجودی
                  </span>
                ) : (
                  <div className="flex flex-col items-end gap-y-[6px]">
                    {isAlternative && (
                      <span className="text-content-accent bg-surface-accentLight text-xs leading-5 h-6 rounded-full px-2 py-1 flex items-center">
                        دارو جایگزین
                      </span>
                    )}
                    <div className="flex flex-col gap-y-1">
                      <div className="flex items-center gap-x-[6px]">
                        {discountPercentage ? (
                          <span className="text-xs text-content-onWarning bg-surface-warning px-2 py-1 rounded-full min-w-8">{`${discountPercentage}%`}</span>
                        ) : (
                          <></>
                        )}

                        <span
                          className={classNames(
                            'text-sm font-medium leading-5 flex items-center gap-x-1',
                            discountPercentage
                              ? 'line-through text-content-disabled'
                              : 'pr-4',
                          )}
                        >
                          {item?.price
                            ? convertRialToTomanNumber(
                                item?.price * item?.quantity,
                              )?.toLocaleString('fa-IR')
                            : ''}
                          {!discountPercentage && (
                            <span className="text-xs">
                              {item?.price ? 'تومان' : ''}
                            </span>
                          )}
                        </span>
                      </div>

                      {discountPercentage ? (
                        <span
                          className={
                            'text-sm font-medium leading-5 flex items-center gap-x-1 pr-4'
                          }
                        >
                          {convertRialToTomanNumber(
                            (item?.price -
                              (item?.price * discountPercentage) / 100) *
                              item?.quantity,
                          )?.toLocaleString('fa-IR')}

                          <span className="text-xs">{'تومان'}</span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
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
