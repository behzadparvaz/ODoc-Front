import { useRouter } from 'next/router';

import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import Map from '@com/_molecules/Map';
import MainLayout from '@com/_template/MainLayout';
import useMapApiCalls from '@hooks/useMapApiCalls';

type Data = {
  totalAmount: number;
  totalCount: number;
  priceAfterDiscount: number;
  packing: number;
  shipmentCost: number;
};

type PreviewProps = {
  data: Data;
};

const Preview = ({ data }: PreviewProps) => {
  const { push } = useRouter();
  const { parsiMapLocationAddress, isLoadingMapsAddress } = useMapApiCalls(0);

  return (
    <MainLayout>
      <div className="w-full h-60 flex justify-center items-center">
        <Map
          addressData={parsiMapLocationAddress}
          loadingAddress={isLoadingMapsAddress}
          addressId={0}
          latitude={35.69976003841564}
          longitude={51.33808390275898}
        />
      </div>
      <div className="w-full p-5 flex flex-col gap-y-5">
        <div className="w-full border border-grey-400 rounded-xl flex flex-col gap-3 p-5">
          <div className="flex justify-between items-center">
            <p className="text-base">ارسال با پیک تپسی دارو</p>
            <Button
              handleClick={() => push('/app/basket/preview/address')}
              size="large"
              variant="primary"
              color="primary"
            >
              تغییر آدرس
            </Button>
          </div>

          <p className="text-md text-grey-400">
            کوی نصر، خیابان صائمی، خیابان ایزدی
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-md">روش پرداخت</p>
          <CheckBox
            icon={''}
            handleChange={() => console.log('change')}
            label="آنلاین"
            labelClassName="text-grey-400"
          />
        </div>

        <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />

        <div className="flex flex-col gap-3">
          <p className="text-md">کد تخفیف</p>

          <div className="w-full rounded-xl border border-grey-400 flex justify-between items-center p-5">
            <p className="text-base">کد تخفیف را اینجا وارد کن</p>
            <Button
              handleClick={() => {
                return;
              }}
              size="large"
              variant="primary"
              color="primary"
            >
              ثبت کد تخفیف
            </Button>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-md">جزییات پرداخت </p>

            <div className="flex flex-col gap-3">
              <div className="w-full h-max flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex justify-center items-center">
                    {`جمع سفارش ${data?.totalCount > 1 ? `(${data?.totalCount})` : ''}`}
                  </span>

                  <span className="flex items-center text-md gap-x-1">
                    {!!data?.totalAmount && data?.totalAmount}
                    <span className="text-sm text-grey-800">
                      {!!data?.totalAmount ? 'تومان' : 'رایگان'}
                    </span>
                  </span>
                </div>
              </div>

              <div className="w-full h-max flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex justify-center items-center">
                    مجموع اقلام پس از تخفیف
                  </span>

                  <span className="flex items-center text-md gap-x-1">
                    {!!data?.priceAfterDiscount && data?.priceAfterDiscount}
                    <span className="text-sm text-grey-800">
                      {!!data?.priceAfterDiscount ? 'تومان' : 'رایگان'}
                    </span>
                  </span>
                </div>
              </div>

              <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />

              <div className="w-full h-max flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex justify-center items-center">
                    هزینه بسته بندی
                  </span>

                  <span className="flex items-center text-md gap-x-1">
                    {!!data?.packing && data?.packing}
                    <span className="text-sm text-grey-800">
                      {!!data?.packing ? 'تومان' : 'رایگان'}
                    </span>
                  </span>
                </div>
              </div>

              <div className="w-full h-max flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex justify-center items-center">
                    هزینه ارسال
                  </span>

                  <span className="flex items-center text-md gap-x-1">
                    {!!data?.shipmentCost && data?.shipmentCost}
                    <span className="text-sm text-grey-800">
                      {!!data?.shipmentCost ? 'تومان' : 'رایگان'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Preview;

export const getServerSideProps = async (context) => {
  const data: Data = {
    totalAmount: 12000000,
    totalCount: 5,
    priceAfterDiscount: 12000000,
    packing: 30000,
    shipmentCost: 0,
  };
  return {
    props: {
      data: data,
    },
  };
};
