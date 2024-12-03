import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import { useGetOtcProductsShapes } from '@api/product/productApis.rq';
import { Radio } from '@com/_atoms/Radio';

type ShapesDataModel = {
  shapeCode: number;
  shapeName: string;
};

const shimerData = ['1', '2', '3', '4', '5'];

type OtcSelectShapeBottomsheetProps = {
  plpQuery?: any;
};

const OtcSelectShapeBottomsheet = ({
  plpQuery,
}: OtcSelectShapeBottomsheetProps) => {
  const { removeLastModal } = useModal();
  const { pathname, query, push } = useRouter();

  const { data: shapesData, isLoading } = useGetOtcProductsShapes(
    plpQuery?.categoryCodeLevel1,
  );
  const shapesList = useMemo(() => shapesData?.queryResult, [shapesData]);

  const handleSelectShape = (shapeData: ShapesDataModel | null) => {
    push({
      pathname: pathname,
      query: !!shapeData
        ? {
            ...plpQuery,
            shapeCode: shapeData?.shapeCode,
            shapeName: shapeData?.shapeName,
          }
        : {
            ...plpQuery,
          },
    });
    removeLastModal();
  };

  const renderShimer = () => {
    return (
      <>
        {shimerData.map((item) => (
          <div key={item} className="h-[52px] flex flex-col">
            <div className="h-[51.5px] flex items-center gap-8">
              <div className="w-6 h-6 bg-surface-tertiary rounded-full animate-pulse" />
              <div className="w-20 h-3 bg-surface-tertiary rounded-full animate-pulse" />
            </div>
            <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
          </div>
        ))}
      </>
    );
  };

  return (
    <BottomModalContainer
      title="انتخاب شکل دارو"
      height={'auto'}
      minHeight={'300px'}
      style={{
        maxWidth: '460px',
      }}
    >
      <div className="w-full h-full max-h-[300px] overflow-y-scroll flex flex-col gap-2 p-4 text-2xs font-normal cursor-pointer odd:bg-grey-50 even:bg-white">
        {isLoading ? (
          renderShimer()
        ) : (
          <>
            <div className="py-2 flex items-center">
              <Radio
                id="all"
                label="همه"
                checked={!query?.shapeName}
                handleChange={() => handleSelectShape(null)}
              />
            </div>

            {shapesList?.map((item: ShapesDataModel) => (
              <div key={item?.shapeCode} className="py-2 flex items-center">
                <Radio
                  id={item?.shapeName}
                  label={item?.shapeName}
                  checked={Number(query?.shapeCode) === item?.shapeCode}
                  handleChange={() => handleSelectShape(item)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </BottomModalContainer>
  );
};

export default OtcSelectShapeBottomsheet;
