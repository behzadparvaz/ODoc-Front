import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import OrderItemCard from '@com/_molecules/OrderItemCard';
import { CloseIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { OrderDetailsDataModel } from '@utilities/interfaces/order';
import OrderStatus from '@com/_molecules/OrderStatus';
import { MainLayout } from '@com/Layout';
import ProgressStepper from '@com/_molecules/ProgressBar';
import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';
import Image from 'next/image';
import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';

const Map = dynamic(() => import('@com/_molecules/Map'));

const OrderDetails = () => {
  const { push } = useRouter();
  const { query } = useRouter();

  const { data, isLoading } = useGetTenderItems(query?.orderCode as string);

  const { parsiMapLocationAddress, isLoadingMapsAddress } = useMapApiCalls(0);

  return (
    <MainLayout>
      <div className="relative">
        <div
          onClick={() => push('/app/orders-history')}
          className="absolute right-4 top-2 z-10 h-10 w-10 bg-white flex justify-center items-center rounded-full cursor-pointer shadow-xl"
        >
          <CloseIconOutline width={24} height={24} stroke={colors.black} />
        </div>

        <div className="w-full h-[460px]  flex justify-center items-center overflow-hidden after:bg-gradient-to-b after:from-white after:absolute after:inset-0 after:h-40 after:w-full">
          <Map
            addressData={parsiMapLocationAddress}
            loadingAddress={isLoadingMapsAddress}
            addressId={0}
            latitude={35.69976003841564}
            longitude={51.33808390275898}
          />
        </div>

        <div className="w-full h-max rounded-t-lg -translate-y-[5px] bg-white flex flex-col">
          <ProgressStepper
            activeStepId={data?.queryResult[0]?.orderStatus?.id + 1}
          />

          <div className="px-4">
            <div className="h-[0.5px] w-full rounded-xl bg-grey-100" />
          </div>

          <OrderStatus data={data?.queryResult[0]} />

          <div className="flex flex-col gap-3">
            <div className="h-24 flex flex-col gap-y-3 bg-grey-50 py-3 px-4 ">
              <span className="text-base font-semibold">جزییات سفارش</span>
              <span className="text-md text-grey-400">
                {data?.queryResult[0]?.createDateTimeOrder}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex justify-start items-center gap-x-2">
                <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
                  <Image
                    src={
                      data?.queryResult[0]?.isSpecialPatient
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
                    {data?.queryResult[0]?.isSpecialPatient
                      ? 'نسخه بیماری خاص'
                      : 'دارو با نسخه'}
                  </span>
                  <span className="text-sm font-semibold">
                    {`کد نسخه ${data?.queryResult[0]?.referenceNumber}`}
                  </span>
                </div>
              </div>
              {data?.queryResult[0]?.orderDetails?.map(
                (item: TenderItemsOrderDataModel, index) => (
                  <OrderItemCard
                    key={item.irc}
                    item={item}
                    dataLength={data?.queryResult[0]?.orderDetails?.length}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetails;
