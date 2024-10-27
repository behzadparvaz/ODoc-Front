import React, { useEffect, useMemo } from 'react';
import Button from '@com/_atoms/Button';
import { MinusIconOutline, PlusIconOutline } from '@com/icons';

const STEP_INC_DEC = 1;

export const inventoryState = {
  LACKED: 'lacked',
  FINISHED: 'finished',
};

type ProductCounterProps = {
  count: number;
  itemQuantity: (count: number) => void;
  inventoryStatus?: {
    state: (typeof inventoryState)[keyof typeof inventoryState];
  };
  isLoading: boolean;
  setTooltipVisible: (status: boolean) => void;
  isTooltipVisible: boolean;
  min: number;
  max: number;
  unitName: string;
};

const ProductCounter: React.FC<ProductCounterProps> = ({
  itemQuantity,
  inventoryStatus,
  isLoading,
  setTooltipVisible,
  isTooltipVisible,
  min,
  max,
  unitName,
  count = 0,
}) => {
  const onChange = (e, value) => {
    e.preventDefault();

    if (value < 0 || max < value) {
      return false;
    }

    if (min && min > value) {
      itemQuantity(0);
    } else {
      itemQuantity(value);
    }
  };

  const isReadyForRemove = useMemo(() => count === min, [count, min]);

  useEffect(() => {
    if (isReadyForRemove && isTooltipVisible) {
      setTooltipVisible(true);

      const tooltipTimer = setTimeout(() => {
        setTooltipVisible(false);
      }, 4000);

      return () => {
        clearTimeout(tooltipTimer);
      };
    }
  }, [isReadyForRemove]);

  return (
    <>
      {inventoryStatus?.state === inventoryState.FINISHED ? (
        <div className="">
          <Button buttonType="outlined" size="small" disabled>
            تمام شد
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 items-center justify-center">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-grey-50 text-xl font-bold disabled:bg-grey-100"
            disabled={max <= count || isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onChange(e, count + STEP_INC_DEC);
            }}
          >
            <PlusIconOutline width={20} height={20} fill={'black'} />
          </button>

          <div className="">
            {count}
            {unitName ? <span className="pr-1">{unitName}</span> : null}
            {isLoading && <div className="" />}
          </div>
          {isReadyForRemove && isTooltipVisible && min !== 1 && (
            <div className="">
              <div>
                حداقل خرید {min} <span className="">{unitName}</span>
              </div>
            </div>
          )}

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-grey-50 text-xl font-bold disabled:bg-grey-100"
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onChange(e, count - STEP_INC_DEC);
            }}
          >
            <MinusIconOutline width={20} height={20} fill={'black'} />
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(ProductCounter);
