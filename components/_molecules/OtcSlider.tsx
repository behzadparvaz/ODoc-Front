import { FilterIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import OtcProductsSlider from './OtcProductsSlider';
import { useState } from 'react';
import useModal from '@hooks/useModal';
import OtcSelectShapeBottomsheet from './OtcSelectShapeBottomsheet';

type ShapesDataModel = {
  shapeCode: number;
  shapeName: string;
};

type Level2DataModel = {
  categoryCodeLevel2: string;
  categoryNameLevel2: string;
};

type OtcSliderProps = {
  category: Level2DataModel;
  shapesData: ShapesDataModel;
};

const OtcSlider = ({ category, shapesData }: OtcSliderProps) => {
  const { addModal } = useModal();

  const [filteredShapes, setFilteredShapes] = useState<ShapesDataModel | null>(
    null,
  );

  const handleOpenSelectShapeItem = () => {
    addModal({
      modal: OtcSelectShapeBottomsheet,
      props: {
        shapesData: shapesData,
        selectedShapeCode: filteredShapes?.shapeCode,
        onSelectShape: (shapeData: ShapesDataModel | null) => {
          setFilteredShapes(shapeData);
        },
      },
    });
  };

  return (
    <div className="relative flex flex-col gap-2 w-full h-max min-h-[200px] py-2 text-xs">
      <div className="flex justify-between items-center gap-6 px-4">
        <span
          onClick={() => {
            return;
          }}
          className="w-2/3 text-base font-semibold truncate cursor-pointer"
        >
          {category?.categoryNameLevel2}
        </span>

        <span
          onClick={() => handleOpenSelectShapeItem()}
          className="flex items-center justify-center gap-1 text-sm font-normal text-center bg-grey-50 w-1/3 min-w-max h-8 rounded-full px-1.5 cursor-pointer"
        >
          <FilterIcon width={20} height={20} fill={colors.black} />
          {filteredShapes?.shapeName || 'شکل دارویی'}
        </span>
      </div>

      <OtcProductsSlider
        categoryCode={category?.categoryCodeLevel2}
        filteredShapesCode={filteredShapes?.shapeCode}
      />
    </div>
  );
};

export default OtcSlider;
