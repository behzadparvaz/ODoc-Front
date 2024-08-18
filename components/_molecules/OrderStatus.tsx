import Link from 'next/link';
import Image from 'next/image';

import { OrderDetailsDataModel } from '@utilities/interfaces/order';

type OrderStatusProps = {
  data: OrderDetailsDataModel;
};

const OrderStatus = ({ data }: OrderStatusProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-grey-400">تحویل به</p>
      <p className="text-md">{data?.address}</p>
      <div className="min-h-40 h-max grid grid-cols-4 gap-2 bg-grey-50 items-center rounded-xl p-4">
        <p className="col-start-1 col-span-4 text-sm text-center">
          ثبت دارو ـــــــ تایید داروخانه ــــــ پرداخت ــــــ آماده سازی ــــــ
          ارسال
        </p>
        <p className="col-start-1 col-span-2 text-base font-medium">
          {data?.pharmacyName}
        </p>
        <p className="col-start-1 col-span-2 text-md text-grey-400">
          {data?.orderStatus}
        </p>

        <p className="col-start-4 col-span-1 text-md text-end text-grey-400">
          {data?.remaingTime}
        </p>

        {data?.orderStatus === 'ارسال شده' ? (
          <>
            <div className="col-start-1 col-span-4 h-0.5 w-full bg-grey-200 rounded-xl px-2" />

            <div className="col-start-1 col-span-4 grid grid-cols-2 gap-2 items-center">
              <div className="flex items-center gap-2 bg-brown">
                <div className="flex justify-center items-center overflow-hidden rounded-xl">
                  <Image
                    src={data?.bikerDetails?.bikerImage}
                    alt="biker-image"
                    width={36}
                    height={36}
                  />
                </div>
                <span className="text-md text-grey-800">
                  {data?.bikerDetails?.bikerName}
                </span>
              </div>

              <span className="text-md text-grey-800  justify-self-end">
                {data?.bikerDetails?.bikePlateNumber}
              </span>

              <span className="flex items-center gap-1 text-md text-grey-400">
                کد تحویل:
                <p className="text-md text-grey-800">
                  {data?.bikerDetails?.deliveryCode}
                </p>
              </span>

              <span className="text-md text-grey-800 justify-self-end">
                تماس با راننده
              </span>
            </div>
          </>
        ) : (
          <div className="col-start-4 col-span-1 text-lg underline underline-offset-8">
            <Link href={'/'}>پیگیری سفارش</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
