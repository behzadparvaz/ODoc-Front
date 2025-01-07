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
  deliveryDiscountAmount = 0,
}: RenderPriceRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-content-tertiary text-sm font-normal">{name}</span>
      <div className="flex items-center flex-col gap-x-1">
        <span className="flex items-center text-content-primary text-base font-normal gap-x-1">
          {!!value ? (
            <>
              {deliveryDiscountAmount > 0 ? (
                <span className="text-left">
                  <span className="text-[#e54917]">ارسال رایگان</span>
                  <span className="mx-1">-</span>
                  <span className="line-through decoration-content-primary text-base text-content-tertiary">
                    {convertRialToTomanNumber(value)?.toLocaleString('fa-IR')}
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
    </div>
  );
};

export default RenderPriceRow;
