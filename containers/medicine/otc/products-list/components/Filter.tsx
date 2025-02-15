import { useRouter } from 'next/router';

import { SliderHorizontalIcon } from '@com/icons';
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
    <div className="relative w-max h-8 flex items-center gap-x-2">
      {!!query?.shapeCode && (
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
  );
};

export default Filter;
