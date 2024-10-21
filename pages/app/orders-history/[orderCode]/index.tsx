import { useRouter } from 'next/router';
import OrderItemCard from '@com/_molecules/OrderItemCard';
import OrderStatus from '@com/_molecules/OrderStatus';
import { MainLayout } from '@com/Layout';
import ProgressStepper from '@com/_molecules/ProgressBar';
import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';
import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import { useGetOrderDetails } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';
import { generalTexts } from '@com/texts/generalTexts';
import CancelOrderModal from '@com/_molecules/CancelOrderModal';
import useModal from '@hooks/useModal';
import { Button } from '@com/_atoms/NewButton';

// const Map = dynamic(() => import('@com/_molecules/Map'));

const OrderDetails = () => {
  const { query } = useRouter();

  const { addModal } = useModal();

  const handleCancelOrder = () => {
    addModal({
      modal: CancelOrderModal,
      props: { orderCode: query?.orderCode as string, step: 'draft' },
    });
  };

  const { data, isLoading } = useGetOrderDetails(query?.orderCode as string);

  // const { parsiMapLocationAddress, isLoadingMapsAddress } = useMapApiCalls(0);

  return (
    <MainLayout title="جزئیات سفارش" hasHeader hasBackButton>
      {isLoading ? (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      ) : (
        <div className="relative">
          {/* <div className="w-full h-[460px]  flex justify-center items-center overflow-hidden after:bg-gradient-to-b after:from-white after:absolute after:inset-0 after:h-40 after:w-full">
            <Map
              addressData={parsiMapLocationAddress}
              loadingAddress={isLoadingMapsAddress}
              addressId={0}
              latitude={35.69976003841564}
              longitude={51.33808390275898}
            />
          </div> */}

          <div className="w-full h-max rounded-t-lg bg-white flex flex-col">
            <ProgressStepper activeStepId={data?.orderStatus?.id + 2} />

            <div className="px-4">
              <div className="h-[0.5px] w-full rounded-xl bg-grey-100" />
            </div>

            <OrderStatus data={data} />

            <div className="flex flex-col gap-3">
              <div className="h-24 flex flex-col gap-y-3 bg-grey-50 py-3 px-4 ">
                <span className="text-base font-semibold">جزییات سفارش</span>
                <span className="text-md text-grey-400">
                  {data?.createDateTimeOrder}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4">
                {data?.referenceNumber && (
                  <div className="flex justify-start items-center gap-x-2">
                    <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
                      <NextImage
                        src={
                          data?.isSpecialPatient
                            ? specialPatients
                            : prescriptionMedicine
                        }
                        alt="Rx-image"
                        width={68}
                        height={68}
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <span className="text-sm font-semibold">
                        {data?.isSpecialPatient
                          ? 'نسخه بیماری خاص'
                          : 'دارو با نسخه'}
                      </span>
                      {data?.referenceNumber ? (
                        <span className="text-sm font-semibold">
                          {`کد نسخه ${data?.referenceNumber}`}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )}
                {data?.orderDetails?.map(
                  (item: TenderItemsOrderDataModel, index) => (
                    <OrderItemCard
                      key={item.irc}
                      item={item}
                      dataLength={data?.orderDetails?.length}
                      orderStatus={data?.orderStatus?.name}
                    />
                  ),
                )}
              </div>
              <div className="flex flex-col justify-center border-t-8 border-grey-50 mb-9">
                <span className="text-md font-semibold px-4 mt-2">
                  {generalTexts.policiesTitle}
                </span>
                <span className="text-sm font-normal text-justify text-grey-600 mt-2 px-4">
                  {generalTexts.policiesDesc}
                </span>
              </div>

              <div className="flex flex-col p-4">
                <div className="w-full h-[0.5px] bg-border-primary" />

                <div
                  className="flex h-[52px] items-center text-content-negative cursor-pointer"
                  onClick={handleCancelOrder}
                >
                  لغو سفارش
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OrderDetails;
