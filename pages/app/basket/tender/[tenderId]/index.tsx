import { MouseEvent, useState } from 'react';
import classNames from 'classnames';

import Button from '@com/_atoms/Button';
import MainLayout from '@com/_template/MainLayout';
import { TenderDetailDataModel } from '@utilities/interfaces/tender';
import TenderItems from '@com/_organisms/TenderItems';
import TenderDescription from '@com/_organisms/TenderDescription';
import TenderShipmentDetail from '@com/_organisms/TenderShipmentDetail';

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
    <MainLayout>
      <div className="w-full p-5 flex flex-col gap-y-5">
        <TenderShipmentDetail
          drugStore={data.drugStore}
          shipment={data.shipment}
        />

        <div className="w-full h-9 flex justify-center items-center">
          <span
            onClick={handleChangeTabs}
            className={classNames(
              'w-full text-center cursor-pointer text-md font-bold border-b',
              tab === Tabs.items && 'border-b-2',
            )}
          >
            اقلام سفارش
          </span>
          <span
            onClick={handleChangeTabs}
            className={classNames(
              'w-full text-center cursor-pointer text-md font-bold border-b',
              tab !== Tabs.items && 'border-b-2',
            )}
          >
            توضیحات
          </span>
        </div>

        {tab === Tabs.items && <TenderItems data={data} />}

        {tab === Tabs.description && (
          <TenderDescription description={data.description} />
        )}

        <Button
          variant="primary"
          color="primary"
          className="w-full h-10 mt-5 bg-primary-800 text-white"
        >
          تکمیل خرید
        </Button>
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
        companyCountry: 'ایران',
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
        companyCountry: 'آلمان',
        unavaiable: true,
        total: 4200000,
        sugesstedItems: [
          {
            id: 1,
            image: '/static/images/staticImages/priorin.jpg',
            drugName: 'پریورین',
            companyName: 'بایر',
            quantity: '1',
            price: 4200000,
            quantityType: 'ورق',
            companyCountry: 'آلمان',
            unavaiable: false,
            total: 4200000,
          },
          {
            id: 2,
            image: '/static/images/staticImages/priorin.jpg',
            drugName: 'پریورین',
            companyName: 'بایر',
            quantity: '1',
            price: 4200000,
            quantityType: 'ورق',
            companyCountry: 'آلمان',
            unavaiable: false,
            total: 4200000,
          },
        ],
      },
      {
        id: 2,
        image: '/static/images/staticImages/alopexy.webp',
        drugName: 'آلوپیکسی',
        companyName: 'پیکسیلین',
        quantity: '3',
        price: 2400000,
        quantityType: 'محلول',
        companyCountry: 'آلمان',
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
        companyCountry: 'آلمان',
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
