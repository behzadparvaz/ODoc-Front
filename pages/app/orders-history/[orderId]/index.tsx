import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import OrderItemCard from '@com/_molecules/OrderItemCard';
import MainLayout from '@com/_template/MainLayout';
import { CloseIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { OrderDetailsDataModel } from '@utilities/interfaces/order';
import OrderStatus from '@com/_molecules/OrderStatus';

type OrderDetailsProps = {
  data?: OrderDetailsDataModel;
};

const Map = dynamic(() => import('@com/_molecules/Map'));

const OrderDetails = ({ data }: OrderDetailsProps) => {
  const { back } = useRouter();

  const { parsiMapLocationAddress, isLoadingMapsAddress } = useMapApiCalls(0);

  return (
    <MainLayout>
      <div className="relative flex flex-col gap-5 py-5 px-4">
        <div
          onClick={() => back()}
          className="absolute right-6 top-7 z-10 h-6 w-6 bg-grey-500 flex justify-center items-center rounded-full cursor-pointer"
        >
          <CloseIconOutline width={24} height={24} stroke={colors.white} />
        </div>

        <div className="w-full h-48 rounded-xl flex justify-center items-center overflow-hidden">
          <Map
            addressData={parsiMapLocationAddress}
            loadingAddress={isLoadingMapsAddress}
            addressId={0}
            latitude={35.69976003841564}
            longitude={51.33808390275898}
          />
        </div>

        <OrderStatus data={data} />

        <div className="flex flex-col gap-3">
          <p className="text-base">جزییات سفارش</p>
          <p className="text-md text-grey-400">{data?.orderCreatedAt}</p>
          {data?.items?.map((item, index) => (
            <OrderItemCard
              key={item.id}
              item={item}
              index={index}
              dataLength={data?.items?.length}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: OrderDetailsDataModel = {
    address: 'کوی نصر، خیابان صائمی، خیابان ایزدی',
    pharmacyName: 'داروخانه دکتر ستاری (بهشتی)',
    // orderStatus: 'ارسال شده',
    orderStatus: 'در حال آماده سازی سفارش',
    remaingTime: '29:05',
    orderCreatedAt: 'سه شنبه ۲۳ مرداد، ساعت ۱۴:۱۷',
    bikerDetails: {
      bikerName: 'محمد مهدی اسدی',
      bikerImage: '/static/images/staticImages/avatar.jpg',
      bikePlateNumber: '۳۶۵ ب ۱۳',
      deliveryCode: 123456,
    },
    items: [
      {
        id: 1,
        image: '/static/images/staticImages/priorin.jpg',
        drugName: 'پریورین',
        companyName: 'بایر',
        quantity: '1',
        price: 4200000,
        quantityType: 'ورق',
      },
      {
        id: 2,
        image: '/static/images/staticImages/alopexy.webp',
        drugName: 'آلوپیکسی',
        companyName: 'پیکسیلین',
        quantity: '10',
        price: 2400000,
        quantityType: 'ورق',
      },
      {
        id: 3,
        image: '/static/images/staticImages/phyto.jpg',
        drugName: 'فیتو',
        companyName: 'فیتو',
        quantity: '12',
        price: 1500000,
        quantityType: 'ورق',
      },
    ],
  };
  return {
    props: {
      data,
    },
  };
};

export default OrderDetails;
