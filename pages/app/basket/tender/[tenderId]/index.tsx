import { MouseEvent, useState } from 'react';
import classNames from 'classnames';

import Button from '@com/_atoms/Button';
import { TenderDetailDataModel } from '@utilities/interfaces/tender';
import TenderProductList from '@com/_organisms/TenderIProductList';
import TenderDescription from '@com/_organisms/TenderDescription';
import TenderShipmentDetail from '@com/_organisms/TenderShipmentDetail';
import Image from 'next/image';
import { MainLayout } from '@com/Layout';

type TenderDetailProps = {
  data: TenderDetailDataModel;
};

enum Tabs {
  items = 'اقلام سفارش',
  description = 'توضیحات',
}

const TenderDetail = ({ data }: TenderDetailProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.items);

  const handleChangeTabs = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget?.innerText === Tabs.items) {
      setTab(Tabs.items);
    } else {
      setTab(Tabs.description);
    }
  };

  return (
    <MainLayout hasBottomNavigation>
      <div className="w-full h-[128] grid grid-rows-1 grid-cols-1 items-start">
        <div className="row-start-1 row-end-2 col-sart-1 col-end-2 flex justify-start items-center object-contain overflow-hidden">
          <Image
            src={'/static/images/staticImages/tender-detail-banner.png'}
            width={412}
            height={128}
            alt="tender-detail-banner"
          />
        </div>

        <div className="row-start-1 row-end-2 col-start-1 col-end-2 z-10 px-5 translate-y-[40px]">
          <TenderShipmentDetail
            drugStore={data.drugStore}
            shipment={data.shipment}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-2 translate-y-[40px] mt-4">
        <div className="relative w-[264px] h-12 flex justify-center items-center bg-grey-50 self-center rounded-full">
          <div
            className={classNames(
              'absolute w-32 h-10 bg-white top-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
              tab === Tabs.items ? 'right-1' : 'right-[132px]',
            )}
          />
          <span
            onClick={handleChangeTabs}
            className={classNames(
              'w-full text-center cursor-pointer text-sm font-medium leading-6 z-10',
            )}
          >
            اقلام سفارش
          </span>
          <span
            onClick={handleChangeTabs}
            className={classNames(
              'w-full text-center cursor-pointer text-sm font-medium leading-6 z-10',
            )}
          >
            توضیحات
          </span>
        </div>

        {tab === Tabs.items && <TenderProductList data={data} />}

        {tab === Tabs.description && (
          <TenderDescription description={data.description} />
        )}

        <div className="w-full h-16 flex justify-between items-center mt-2 mb-7 px-4 py-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-md leading-6 font-bold">{`${data?.totalAmount} تومان`}</span>
            <span className="text-sm leading-5">قابل پرداخت</span>
          </div>

          <Button className="h-[52px] bg-black text-white text-lg font-bold !rounded-full">
            تکمیل خرید
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default TenderDetail;

export const getServerSideProps = async (context) => {
  const data: TenderDetailDataModel = {
    drugStore: {
      id: 1,
      name: 'داروخانه دکتر ستاری (بهشتی)',
      type: 'شبانه روزی',
      rate: 4.5,
    },
    shipment: {
      type: 'پیک تپسی دارو',
      cost: 0,
    },
    totalAmount: 12000000,
    packing: 30000,
    picSearchItems: [
      {
        id: 1,
        image: '/static/images/staticImages/chelophen.jpg',
        drugName: 'ژلوفن',
        companyName: 'رازی',
        quantity: '1',
        price: 30000,
        quantityType: 'ورق',
        companyCountry: [{ name: 'ایران', id: '1' }],
        unavaiable: false,
        total: 30000,
      },
    ],
    items: [
      {
        id: 1,
        image: '/static/images/staticImages/priorin.jpg',
        drugName: 'پریورین',
        companyName: 'بایر',
        quantity: '1',
        price: 4200000,
        quantityType: 'ورق',
        companyCountry: [{ name: 'ایران', id: '1', price: 30000 }],
        unavaiable: true,
        total: 4200000,
        sugesstedItem: {
          id: 1,
          image: '/static/images/staticImages/priorin.jpg',
          drugName: 'پریورین',
          companyName: 'بایر',
          quantity: '1',
          price: 4200000,
          quantityType: 'ورق',
          companyCountry: [{ name: 'آلمان', id: '1', price: 20000 }],
          unavaiable: false,
          total: 4200000,
        },
      },
      {
        id: 2,
        image: '/static/images/staticImages/alopexy.webp',
        drugName: 'آلوپیکسی',
        companyName: 'پیکسیلین',
        quantity: '3',
        price: 2400000,
        quantityType: 'محلول',
        companyCountry: [
          { name: 'ایران', id: '1', price: 30000 },
          { name: 'آلمان', id: '2', price: 20000 },
        ],
        unavaiable: false,
        total: 7200000,
      },
      {
        id: 3,
        image: '/static/images/staticImages/phyto.jpg',
        drugName: 'فیتو',
        companyName: 'فیتو',
        quantity: '2',
        price: 1500000,
        quantityType: 'ورق',
        companyCountry: [{ name: 'فرانسه', id: '1' }],
        unavaiable: false,
        total: 3000000,
      },
    ],
    description: {
      customerNotes:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،',
      drugStoreNotes:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،',
      drugStoreVoice: '"https://www.w3schools.com/html/river.mp3"',
    },
  };
  return {
    props: {
      data: data,
    },
  };
};
