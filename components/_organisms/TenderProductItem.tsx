import OrderItemCard from '@com/_molecules/OrderItemCard';
import { TenderItemsOrderDataModel } from '@utilities/interfaces/tender';

type TenderProductItemProps = {
  item: TenderItemsOrderDataModel;
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
      <OrderItemCard
        item={item}
        isUnavaiable={item?.isunavailable}
        discountPercentage={item?.discount?.percentage}
      />

      {item?.alternatives?.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <p className="text-2xs font-bold">پیشنهاد داروخانه</p>

          <OrderItemCard
            key={index}
            item={item?.alternatives[0]}
            isAlternative
            discountPercentage={item?.discount?.percentage}
          />
        </div>
      )}

      {dataLength - 1 !== index && (
        <div className="h-0.5 w-full bg-grey-50 rounded-xl px-2" />
      )}
    </>
  );
};

export default TenderProductItem;
