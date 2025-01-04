import { convertRialToTomanNumber } from '@utilities/mainUtils';

type RenderPriceRowProps = {
  name: string;
  value: number;
  deliveryFinalPrice?: number;
  deliveryDiscountAmount?: number;
};

const RenderPriceRow = ({
  name,
  value,
  deliveryFinalPrice,
  deliveryDiscountAmount,
}: RenderPriceRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-content-tertiary text-sm font-normal">{name}</span>
      <span className="flex items-center text-content-primary text-base font-normal gap-x-1">
        {!!value ? (
          <>
            {deliveryDiscountAmount > 0 ? (
              <span className="text-left">
                <span className="line-through decoration-content-tertiary text-xs text-content-tertiary block">
                  {convertRialToTomanNumber(value)?.toLocaleString('fa-IR')}
                </span>
                <span className="text-sm text-content-primary block">
                  {convertRialToTomanNumber(deliveryFinalPrice)?.toLocaleString(
                    'fa-IR',
                  )}
                </span>
              </span>
            ) : (
              convertRialToTomanNumber(value)?.toLocaleString('fa-IR')
            )}
            <span className="text-xs text-content-primary"> تومان</span>
          </>
        ) : (
          <span className="text-xs text-content-primary">رایگان</span>
        )}
      </span>
    </div>
  );
};

export default RenderPriceRow;
