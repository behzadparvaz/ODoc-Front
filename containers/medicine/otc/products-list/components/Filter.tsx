import { useRouter } from 'next/router';

import { ChevronDownIcon, SliderHorizontalIcon } from '@com/icons';
import useModal from '@hooks/useModal';

import ShapeBottomsheet from './ShapeBottomsheet';

const Filter = () => {
  const { addModal } = useModal();
  const { query } = useRouter();

  const handleFilterModal = () => {
    addModal({
      modal: ShapeBottomsheet,
      props: { plpQuery: query },
    });
  };

  return (
    <div className="w-full h-[56px] flex items-center px-4 py-3 gap-3">
      <div
        className="flex items-center gap-[6px] cursor-pointer"
        onClick={handleFilterModal}
      >
        <SliderHorizontalIcon width={24} height={24} fill={'black'} />
        <span>{`فیلتر ${query?.shapeName ? `(${query?.shapeName})` : ''}`}</span>
        <ChevronDownIcon width={20} height={20} stroke={'black'} />
      </div>
    </div>
  );
};

export default Filter;
