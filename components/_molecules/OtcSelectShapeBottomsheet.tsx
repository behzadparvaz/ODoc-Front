import classNames from 'classnames';

import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';

type ShapesDataModel = {
  shapeCode: number;
  shapeName: string;
};

type OtcSelectShapeBottomsheetProps = {
  shapesData: ShapesDataModel[];
  selectedShapeCode?: number;
  onSelectShape: (shapeData: ShapesDataModel | null) => void;
};

const OtcSelectShapeBottomsheet = ({
  shapesData,
  selectedShapeCode,
  onSelectShape,
}: OtcSelectShapeBottomsheetProps) => {
  const { removeLastModal } = useModal();

  const handleSelectShape = (shapeData: ShapesDataModel | null) => {
    onSelectShape(shapeData);
    removeLastModal();
  };

  return (
    <BottomModalContainer
      title="انتخاب شکل دارو"
      height={400}
      style={{
        maxWidth: '412px',
      }}
    >
      <div className="w-full h-full flex flex-col gap-2 p-4 text-2xs font-normal cursor-pointer odd:bg-grey-50 even:bg-white">
        <span
          onClick={() => handleSelectShape(null)}
          className={classNames(
            'h-6',
            !selectedShapeCode && '!text-orange-500',
          )}
        >
          همه
        </span>
        {shapesData?.map((item: ShapesDataModel) => (
          <span
            key={item?.shapeCode}
            onClick={() => handleSelectShape(item)}
            className={classNames(
              'h-6',
              selectedShapeCode === item?.shapeCode && '!text-orange-500',
            )}
          >
            {item?.shapeName}
          </span>
        ))}
      </div>
    </BottomModalContainer>
  );
};

export default OtcSelectShapeBottomsheet;
