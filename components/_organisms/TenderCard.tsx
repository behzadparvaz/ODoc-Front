import { useGetVendorDetails } from '@api/vendor/vendor.rq';

import { Shop, ThreeDots } from '@com/icons';
import NextImage from '@com/_core/NextImage';

import useModal from '@hooks/useModal';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';

import TenderItemDetailModal from './TenderItemDetailModal';

type TenderCardProps = { data: TenderItemsListDataModel };

const TenderCard = ({ data }: TenderCardProps) => {
  const { addModal } = useModal();
  const { data: vendorData, isLoading: vendorIsLoading } = useGetVendorDetails(
    data?.vendorCode,
  );

  const handleOpenDetailModal = () => {
    addModal({
      modal: TenderItemDetailModal,
      props: {
        tenderData: data,
        vendorData: vendorData,
      },
    });
  };
  return (
    <div className="border border-grey-200 rounded-xl">
      <div className="px-4 py-2 flex items-center gap-2">
        <span className="p-1 rounded-full border border-orange-600">
          <Shop />
        </span>
        <h3>{vendorData?.vendorName}</h3>
      </div>

      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex gap-2">
          {data?.orderDetails?.map((item, index) => {
            if (index > 2) {
              return;
            }
            return (
              <div
                key={index}
                className="border border-grey-400 rounded-md h-[32px] overflow-hidden"
              >
                <NextImage
                  width={32}
                  height={32}
                  src={item?.imageLink}
                  alt={item?.irc}
                />
              </div>
            );
          })}

          <div className="border border-grey-400 bg-grey-100 rounded-md w-[32px] h-[32px] flex items-center justify-center">
            <ThreeDots />
          </div>
        </div>

        <div className="text-grey-500 text-sm">{`${data?.finalPrice} تومان`}</div>
      </div>

      <div
        className="border-t border-t-grey-200 text-center font-medium cursor-pointer"
        onClick={handleOpenDetailModal}
      >
        <div className="p-3">مشاهده جزییات سفارش و پرداخت</div>
      </div>
    </div>
  );
};

export default TenderCard;