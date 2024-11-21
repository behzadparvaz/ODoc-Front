import { convertRialToTomanNumber } from '@utilities/mainUtils';

type RenderPriceRowProps = {
  name: string;
  value: number;
};

const RenderPriceRow = ({ name, value }: RenderPriceRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-content-tertiary text-sm font-normal">{name}</span>
      <span className="flex items-center text-content-primary text-base font-normal gap-x-1">
        {!!value ? (
          <>
            {convertRialToTomanNumber(value)?.toLocaleString('fa-IR')}
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
