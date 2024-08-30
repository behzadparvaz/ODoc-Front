import React, { useState } from 'react';

import ProductCounter from '@com/_atoms/ProductCounter';
import Button from '@com/_atoms/Button';

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
                                               unitName = 'عدد'
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
        <Button disabled>
          تمام شد
        </Button>
      ) : (
        <button
          className=""
          disabled={Boolean(isLoading)}
          onClick={(event) => {
            event.stopPropagation();
            onChangeCount(min === 0 ? 1 : min);
            setTooltipVisible(true);
          }}
        >
          افزودن
        </button>
      )}
    </div>
  );
};

export default AddButton;
