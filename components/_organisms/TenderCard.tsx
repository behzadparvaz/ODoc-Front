import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { ChevronLeftIconOutline, Shop } from '@com/icons';
import NextImage from '@com/_core/NextImage';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';
import { colors } from '@configs/Theme';
import { convertRialToTomanNumber } from '@utilities/mainUtils';
import { routeList } from '@routes/routeList';
import classNames from 'classnames';

const Divider = dynamic(() => import('@com/_atoms/Divider'));

type TenderCardProps = {
  data: TenderItemsListDataModel;
  orderCode: string;
  offerId: string;
};

const TenderCard = ({ data, orderCode, offerId }: TenderCardProps) => {
  const { push } = useRouter();

  const { data: vendorData, isLoading: vendorIsLoading } = useGetVendorDetails(
    data?.vendorCode,
  );

  const handleProccessOrder = () => {
    push(`${routeList.ordersHistory}/${orderCode}/${offerId}/preview`);
  };

  return (
    <div
      className={classNames(
        'border border-grey-200 h-full rounded-xl  cursor-pointer',
      )}
      onClick={handleProccessOrder}
    >
      <div className="h-max px-4 pt-4 pb-2 flex items-center gap-2 justify-between">
        <Shop height={24} width={24} fill={colors.gray[600]} />

        <div className="flex flex-col justify-center gap-4 h-full w-full">
          <h3 className="text-base font-medium">
            {vendorData?.isShowName
              ? vendorData?.vendorName
              : vendorData?.secondaryName}
          </h3>
          {vendorData?.isShowName && (
            <span className="text-sm text-content-tertiary line-clamp-2">
              {vendorData?.location?.address}
            </span>
          )}
        </div>

        <ChevronLeftIconOutline width={24} height={24} fill={colors.black} />
      </div>

      {!!data?.finalPrice && (
        <div className="h-[68px] flex items-center px-4 gap-2">
          {data?.orderDetails?.map((item, index) => {
            if (item?.referenceNumber) {
              return;
            }
            return (
              <div
                key={index}
                className="h-[44px] w-[44px] relative flex justify-center items-center"
              >
                <div className="absolute left-0 top-0 h-[24px] w-[24px] flex justify-center items-center bg-surface-accentLight rounded-full text-content-accent font-medium text-base z-10">
                  {item?.quantity}
                </div>

                <div className="rounded-md h-[32px] overflow-hidden">
                  <NextImage
                    width={32}
                    height={32}
                    src={item?.imageLink}
                    alt={item?.irc}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Divider />

      <div className="h-[48px] flex items-center justify-between px-4 py-2 cursor-pointer">
        <span className="text-sm font-normal text-content-tertiary">
          قابل پرداخت
        </span>
        {!!data?.finalPrice ? (
          <span className="text-sm text-content-primary font-medium">
            {convertRialToTomanNumber(data?.finalPrice)?.toLocaleString(
              'fa-IR',
            )}
            <span className="text-xs"> تومان</span>
          </span>
        ) : (
          <span className="text-sm text-content-primary font-medium">
            رایگان
          </span>
        )}
      </div>
    </div>
  );
};

export default TenderCard;
