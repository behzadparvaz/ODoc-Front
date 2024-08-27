import { TenderDetailDataModel } from '@utilities/interfaces/tender';

import TenderProductItem from './TenderProductItem';

type TenderProductListProps = {
  data: TenderDetailDataModel;
};

const TenderProductList = ({ data }: TenderProductListProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-4 px-4 pb-4">
        {data?.items?.map((item, index) => (
          <TenderProductItem
            key={index}
            item={item}
            index={index}
            dataLength={data.items.length}
          />
        ))}

        {data.picSearchItems.length > 0 && (
          <div className="flex flex-col gap-y-3">
            <p className="text-md leading-6 font-bold">
              نتیجه جستجوی عکس شما در داروخانه
            </p>

            {data.picSearchItems?.map((picSearchItem, index) => (
              <TenderProductItem
                key={index}
                item={picSearchItem}
                index={index}
                dataLength={data.picSearchItems.length}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-max flex flex-col p-4 gap-y-2 bg-grey-50">
        <span className="text-start text-md leading-6 font-bold">
          جزییات پرداخت
        </span>
        <div className="flex items-center justify-between text-sm leading-5">
          <span>{`جمع سفارش ${data?.items?.length > 1 ? `(${data.items.length})` : ''}`}</span>

          <span>
            {!!data.totalAmount ? `${data.totalAmount} تومان` : 'رایگان'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm leading-5">
          <span>هزینه بسته بندی</span>

          <span>{!!data.packing ? `${data.packing} تومان` : 'رایگان'}</span>
        </div>

        <div className="flex items-center justify-between text-sm leading-5">
          <span>هزینه ارسال</span>

          <span className="flex items-center text-md gap-x-1">
            <span>
              {!!data?.shipment.cost
                ? `${data?.shipment.cost} تومان`
                : 'رایگان'}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default TenderProductList;
