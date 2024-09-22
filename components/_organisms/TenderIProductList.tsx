import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';

import TenderProductItem from './TenderProductItem';
import { convertRialToToman } from '@utilities/mainUtils';

type TenderProductListProps = {
  orderItems: TenderItemsOrderDataModel[];
  totalPrice: number;
  finalPrice: number;
  packingPrice?: number;
  deliveryPrice?: number;
};

const TenderProductList = ({
  orderItems,
  totalPrice,
  finalPrice,
  packingPrice,
  deliveryPrice,
}: TenderProductListProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-4 px-4 pb-4">
        {orderItems?.map((item, index) => (
          <TenderProductItem
            key={index}
            item={item}
            index={index}
            dataLength={orderItems?.length}
          />
        ))}

        {/* {orderItems.picSearchItems.length > 0 && (
          <div className="flex flex-col gap-y-3">
            <p className="text-md leading-6 font-bold">
              نتیجه جستجوی عکس شما در داروخانه
            </p>

            {orderItems.picSearchItems?.map((picSearchItem, index) => (
              <TenderProductItem
                key={index}
                item={picSearchItem}
                index={index}
                orderItemsLength={orderItems.picSearchItems.length}
              />
            ))}
          </div>
        )} */}
      </div>

      <div className="w-full h-max flex flex-col p-4 gap-y-2 bg-grey-50">
        <span className="text-start text-md leading-6 font-bold">
          جزییات پرداخت
        </span>
        <div className="flex items-center justify-between text-sm leading-5">
          <span>{`جمع سفارش ${orderItems?.length > 1 ? `(${orderItems?.length})` : ''}`}</span>

          <span>
            {!!totalPrice ? `${convertRialToToman(totalPrice)}` : 'رایگان'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm leading-5">
          <span>هزینه بسته بندی</span>

          <span>
            {!!packingPrice ? `${convertRialToToman(packingPrice)}` : 'رایگان'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm leading-5">
          <span>هزینه ارسال</span>

          <span className="flex items-center text-md gap-x-1">
            <span>
              {!!deliveryPrice
                ? `${convertRialToToman(deliveryPrice)}`
                : 'رایگان'}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default TenderProductList;
