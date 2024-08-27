import CompanyName from '@com/_molecules/CompanyCountry';
import OrderItemCard from '@com/_molecules/OrderItemCard';
import { OrderDetailsItemDataModel } from '@utilities/interfaces/order';

type TenderProductItemProps = {
  item: OrderDetailsItemDataModel;
  index: number;
  dataLength: number;
};

const TenderProductItem = ({
  item,
  index,
  dataLength,
}: TenderProductItemProps) => {
  return (
    <>
      <OrderItemCard item={item} />

      {item?.companyCountry && item?.companyCountry?.length > 1 && (
        <CompanyName data={item?.companyCountry} />
      )}

      {item?.unavaiable && !!item?.sugesstedItem && (
        <div className="flex flex-col gap-y-2">
          <p className="text-xs font-bold">پیشنهاد داروخانه</p>

          <OrderItemCard key={index} item={item?.sugesstedItem} />
        </div>
      )}

      {dataLength - 1 !== index && (
        <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
      )}
    </>
  );
};

export default TenderProductItem;
