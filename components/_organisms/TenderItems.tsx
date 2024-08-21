import OrderItemCard from '@com/_molecules/OrderItemCard';
import { TenderDetailDataModel } from '@utilities/interfaces/tender';

type TenderItemsProps = {
  data: TenderDetailDataModel;
};

const TenderItems = ({ data }: TenderItemsProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      {data?.items?.map((item, index) => (
        <>
          <OrderItemCard
            key={index}
            item={item}
            index={index}
            dataLength={data.items.length}
          />
          {item?.sugesstedItems && item?.sugesstedItems?.length > 0 && (
            <div className="flex flex-col gap-y-2 p-5">
              <p className="text-xs text-grey-400 font-bold">
                پیشنهاد داروخانه{' '}
              </p>

              {item?.sugesstedItems?.map((sugesstedItem, index) => (
                <OrderItemCard
                  key={index}
                  item={sugesstedItem}
                  index={index}
                  dataLength={item.sugesstedItems.length}
                />
              ))}

              <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
            </div>
          )}
        </>
      ))}

      {data.picSearchItems.length > 0 && (
        <div className="flex flex-col gap-y-">
          <p className="text-md text-grey-400 font-bold">
            نتیجه جستجوی عکس شما در داروخانه{' '}
          </p>

          {data.picSearchItems?.map((picSearchItem, index) => (
            <OrderItemCard
              key={index}
              item={picSearchItem}
              index={index}
              dataLength={data.picSearchItems.length}
            />
          ))}
        </div>
      )}

      <div className="w-full h-max flex flex-col p-5 rounded-xl gap-y-2 bg-grey-50">
        <span className="text-start text-base">جزییات پرداخت</span>
        <div className="flex items-center justify-between">
          <span className="flex justify-center items-center">جمع سفارش</span>

          <span className="flex items-center text-md  gap-x-1">
            {!!data.totalAmount && data.totalAmount}
            <span className="text-sm text-grey-800">
              {data.totalAmount ? 'تومان' : 'رایگان'}
            </span>
          </span>
        </div>

        <div className="w-full h-max flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <span className="flex justify-center items-center">
              هزینه بسته بندی
            </span>

            <span className="flex items-center text-md gap-x-1">
              {!!data.packing && data.packing}
              <span className="text-sm text-grey-800">
                {data.packing ? 'تومان' : 'رایگان'}
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
              {!!data.shipment.cost && data.shipment.cost}
              <span className="text-sm text-grey-800">
                {data.shipment.cost ? 'تومان' : 'رایگان'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderItems;
