import React, { useState } from 'react';

import ProductCounter from '@com/_atoms/ProductCounter';
import Button from '@com/_atoms/Button';
import { PlusIconOutline } from '@com/icons';

interface AddButtonProps {
  count: number;
  onChangeCount: (count: number) => void;
  isLoading?: boolean;
  max?: number;
  min?: number;
  unitName?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  count,
  isLoading,
  onChangeCount,
  min = 1,
  max = 100,
  unitName = 'عدد',
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);

  return (
    <div>
      {count > 0 ? (
        <ProductCounter
          min={min}
          max={max}
          unitName={unitName}
          count={count}
          isLoading={Boolean(isLoading)}
          itemQuantity={onChangeCount}
          isTooltipVisible={isTooltipVisible}
          setTooltipVisible={setTooltipVisible}
        />
      ) : max === 0 ? (
        <Button disabled>تمام شد</Button>
      ) : (
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-grey-50 text-xl font-bold disabled:bg-grey-100"
          disabled={Boolean(isLoading)}
          onClick={(event) => {
            event.stopPropagation();
            onChangeCount(min === 0 ? 1 : min);
            setTooltipVisible(true);
          }}
        >
          <PlusIconOutline width={20} height={20} fill={'black'} />
        </button>
      )}
    </div>
  );
};

export default AddButton;
