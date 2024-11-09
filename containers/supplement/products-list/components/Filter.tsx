import {
  ArrowUpArrowDownIcon,
  ChevronDownIcon,
  SliderHorizontalIcon,
} from '@com/icons';
import useModal from '@hooks/useModal';
import FilterBottomsheet from './FilterBottomsheet';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Filter = () => {
  const { addModal } = useModal();
  const { query } = useRouter();

  const [filterItemsNumber, setFilterItemsNumber] = useState(() => {
    const brandQuantity = query?.brand ? 1 : 0;
    const shapeQuantity = query?.shape ? 1 : 0;
    return brandQuantity + shapeQuantity;
  });

  const handleFilterModal = () => {
    addModal({
      modal: FilterBottomsheet,
      props: {},
    });
  };

  return (
    <div className="w-full h-[56px] flex items-center px-4 py-3 gap-3">
      <div className="flex items-center gap-[6px] cursor-pointer">
        <ArrowUpArrowDownIcon width={20} height={20} fill={'black'} />
        <span>پرفروش‌ترین</span>
        <ChevronDownIcon width={20} height={20} stroke={'black'} />
      </div>

      <div
        className="flex items-center gap-[6px] cursor-pointer"
        onClick={handleFilterModal}
      >
        <SliderHorizontalIcon width={24} height={24} fill={'black'} />
        <span>{`فیلتر ${filterItemsNumber ? `(${filterItemsNumber})` : ''}`}</span>
        <ChevronDownIcon width={20} height={20} stroke={'black'} />
      </div>
    </div>
  );
};

export default Filter;
