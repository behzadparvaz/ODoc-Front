import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import OtcProductsSlider from './OtcProductsSlider';
import { useState } from 'react';
import useModal from '@hooks/useModal';
import OtcSelectShapeBottomsheet from './OtcSelectShapeBottomsheet';
import NextLink from '@com/_core/NextLink';
import { routeList } from '@routes/routeList';

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
    <div
      onClick={() => {
        return;
      }}
      className="relative flex flex-col gap-2 h-max min-h-[200px] px-4 py-2 text-xs rounded-lg"
    >
      <div className="flex justify-between items-center gap-6">
        <NextLink
          href={`${routeList.productPage}${category?.categoryCodeLevel2}?categoryName=${category?.categoryNameLevel2}`}
        >
          <span className="w-2/3 text-sm font-semibold text-orange-500 truncate">
            {category?.categoryNameLevel2}
          </span>
        </NextLink>

        <span
          onClick={() => handleOpenSelectShapeItem()}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-center bg-grey-50 w-1/3 min-w-max h-6 rounded-full px-2 cursor-pointer"
        >
          {filteredShapes?.shapeName || 'شکل دارویی'}
          <ChevronLeftIconOutline width={16} height={16} fill={colors.black} />
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
