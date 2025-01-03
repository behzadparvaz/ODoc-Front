import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  ArrowUpArrowDownIcon,
  ChevronDownIcon,
  SliderHorizontalIcon,
} from '@com/icons';
import useModal from '@hooks/useModal';

import FilterBottomsheet from './FilterBottomsheet';
import SortBottomsheet from './SortBottomsheet';

const Filter = () => {
  const { addModal } = useModal();
  const { query } = useRouter();

  const [filterItemsNumber, setFilterItemsNumber] = useState<number | null>();

  useEffect(() => {
    const brandQuantity = query?.brand ? 1 : 0;
    const shapeQuantity = query?.shapeCode ? 1 : 0;
    setFilterItemsNumber(brandQuantity + shapeQuantity);
  }, [query]);

  const handleSortModal = () => {
    addModal({
      modal: SortBottomsheet,
      props: { plpQuery: query },
    });
  };

  const handleFilterModal = () => {
    addModal({
      modal: FilterBottomsheet,
      props: { plpQuery: query },
    });
  };

  return (
    <div className="w-full h-[56px] flex items-center px-4 py-3 gap-3">
      <div
        className="flex items-center gap-[6px] cursor-pointer"
        onClick={handleSortModal}
      >
        <ArrowUpArrowDownIcon width={20} height={20} fill={'black'} />
        <span>{query?.sortName ?? 'پرفروش‌ترین'}</span>
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
