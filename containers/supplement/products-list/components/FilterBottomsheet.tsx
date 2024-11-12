import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@com/_atoms/NewButton';
import { ArrowRightIconOutline, ChevronLeftIconOutline } from '@com/icons';
import ActionBar from '@com/Layout/ActionBar';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import ShapesFilter from './ShapesFilter';
import BrandFilter from './BrandFilter';

type Shapes = {
  shapeName?: string;
  shapeCode?: string;
};

type FilterBottomsheetProps = {
  plpQuery?: any;
};

const FilterBottomsheet = ({ plpQuery }: FilterBottomsheetProps) => {
  const { push, query, pathname } = useRouter();
  const { removeLastModal } = useModal();

  const [selectedFilterCategory, setSelectedFilterCategory] = useState<
    'brand' | 'shape' | null
  >(null);

  const [selectedShape, setSelectedShape] = useState<Shapes | null>(() => {
    if (plpQuery?.shapeCode) {
      return {
        shapeCode: plpQuery?.shapeCode as string,
        shapeName: plpQuery?.shapeName as string,
      };
    } else null;
  });
  const [selectedBrand, setSelectedBrand] = useState<string>(() =>
    plpQuery?.shapeCode ? (plpQuery?.brand as string) : '',
  );

  const handleSelectBrand = (item: string) => {
    setSelectedBrand(item);
    setSelectedFilterCategory(null);
  };

  const handleSelectShape = (item: Shapes) => {
    setSelectedShape(item);
    setSelectedFilterCategory(null);
  };

  const handleConfirmFilter = () => {
    const filterQuery = {
      ...query,
      brand: selectedBrand,
      shapeCode: selectedShape?.shapeCode,
      shapeName: selectedShape?.shapeName,
    };

    push(
      {
        pathname: pathname,
        query: Object.fromEntries(
          Object.entries(filterQuery).filter(([_, value]) => !!value),
        ),
      },
      undefined,
      { shallow: true },
    );
    removeLastModal();
  };

  const renderFilterContent = () => {
    if (selectedFilterCategory === 'brand') {
      return <BrandFilter onSelectBrand={handleSelectBrand} />;
    }

    if (selectedFilterCategory === 'shape') {
      return <ShapesFilter onSelectShape={handleSelectShape} />;
    }
  };

  return (
    <BottomModalContainer
      height="auto"
      minHeight={300}
      title="فیلتر"
      className="bg-white"
      isDraggable={false}
      rightActionButton={
        <>
          {(selectedBrand || selectedShape) && (
            <div
              className="h-6 w-6 flex items-center justify-center rounded-full bg-surface-tertiary"
              onClick={() => setSelectedFilterCategory(null)}
            >
              <ArrowRightIconOutline
                width={20}
                height={20}
                fill={colors.black}
              />
            </div>
          )}
        </>
      }
    >
      <>
        {!!selectedFilterCategory ? (
          renderFilterContent()
        ) : (
          <>
            <div
              className="w-full h-[52px] flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedFilterCategory('brand')}
            >
              <div className="flex flex-col">
                <span className="text-content-primary text-base leading-6">
                  برند محصول
                </span>

                <span className="text-sm text-content-tertiary">
                  {selectedBrand}
                </span>
              </div>

              <ChevronLeftIconOutline
                width={24}
                height={24}
                fill={colors.gray[400]}
              />
            </div>

            <div className="mr-4 bg-border-primary h-[0.5px] w-full" />

            <div
              className="w-full h-full flex items-center justify-between cursor-pointer py-3"
              onClick={() => setSelectedFilterCategory('shape')}
            >
              <div className="flex flex-col">
                <span className="text-content-primary text-base leading-6">
                  شکل محصول
                </span>

                <span className="text-sm text-content-tertiary">
                  {selectedShape?.shapeName}
                </span>
              </div>

              <ChevronLeftIconOutline
                width={24}
                height={24}
                fill={colors.gray[400]}
              />
            </div>

            <ActionBar type="twoActionHorizontal" className="">
              <Button
                className="w-full"
                variant="secondary"
                size="large"
                onClick={() => {
                  setSelectedShape(null);
                  setSelectedBrand(null);
                }}
              >
                حذف همه
              </Button>
              <Button
                className="w-full"
                variant="primary"
                size="large"
                onClick={handleConfirmFilter}
              >
                اعمال فیلتر
              </Button>
            </ActionBar>
          </>
        )}
      </>
    </BottomModalContainer>
  );
};

export default FilterBottomsheet;
