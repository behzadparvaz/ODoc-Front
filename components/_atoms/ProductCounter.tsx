import React, { useEffect, useMemo } from 'react';
import Button from '@com/_atoms/Button';
import { MinusIconOutline, PlusIconOutline } from '@com/icons';
import classNames from 'classnames';
import Icon from '@utilities/icon';

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
  className?: string;
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
  className = '',
}) => {
  console.log(count);
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
    <div className="w-auto" onClick={(e) => e.stopPropagation()}>
      {inventoryStatus?.state === inventoryState.FINISHED ? (
        <div className="">
          <Button buttonType="outlined" size="small" disabled>
            تمام شد
          </Button>
        </div>
      ) : (
        <div
          className={classNames(
            'flex items-center justify-center bg-white rounded-full shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)]',
            className,
          )}
        >
          <button
            className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-white text-xl font-bold"
            disabled={max <= count || isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onChange(e, count + STEP_INC_DEC);
            }}
          >
            <PlusIconOutline
              width={20}
              height={20}
              fill={isLoading ? '#cecece' : 'black'}
            />
          </button>

          <div className="min-w-8 text-center text-xs">
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-gray-200 animate-spin fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                {count}
                {unitName ? <span className="pr-1">{unitName}</span> : null}
              </>
            )}
          </div>
          {isReadyForRemove && isTooltipVisible && min !== 1 && (
            <div className="">
              <div>
                حداقل خرید {min} <span className="">{unitName}</span>
              </div>
            </div>
          )}

          <button
            className="min-w-8 min-h-8 flex items-center justify-center rounded-full bg-white text-xl font-bold"
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onChange(e, count - STEP_INC_DEC);
            }}
          >
            {count <= 1 ? (
              <Icon name="Trash" width={1.25} height={1.25} fill="black" />
            ) : (
              <MinusIconOutline
                width={20}
                height={20}
                fill={isLoading ? '#cecece' : 'black'}
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductCounter);
