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
    <div className="w-max h-8 flex items-center gap-x-2">
      <div
        className="h-8 px-3 w-max flex items-center rounded-full cursor-pointer bg-surface-tertiary gap-x-2"
        onClick={handleSortModal}
      >
        <ArrowUpArrowDownIcon width={20} height={20} fill={'black'} />
        <span>{query?.sortName ?? 'مرتب سازی'}</span>
        <ChevronDownIcon width={20} height={20} stroke={'black'} />
      </div>

      {query?.categoryCodeLevel1 !== '11' &&
        query?.categoryCodeLevel1 !== '15' && (
          <div className="relative w-max h-8 flex items-center gap-x-2">
            {!!filterItemsNumber && (
              <div className="absolute left-0 top-0 h-3 w-3 flex items-center justify-center rounded-full bg-surface-primary">
                <div className="w-2 h-2 bg-surface-negative rounded-full" />
              </div>
            )}

            <div
              className="h-8 px-3 flex items-center rounded-full cursor-pointer bg-surface-tertiary gap-x-2"
              onClick={handleFilterModal}
            >
              <SliderHorizontalIcon width={24} height={24} fill={'black'} />
              <span>فیلتر</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default Filter;
