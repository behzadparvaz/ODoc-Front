import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@com/_atoms/NewButton';
import { Radio } from '@com/_atoms/Radio';
import { ArrowRightIconOutline, ChevronLeftIconOutline } from '@com/icons';
import ActionBar from '@com/Layout/ActionBar';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';

const shapesList = ['قرص', 'کپسول', 'شربت', 'پودر', 'سایر'];

const FilterBottomsheet = () => {
  const { push, query, pathname } = useRouter();
  const { removeLastModal } = useModal();

  const [selectedFilterCategory, setSelectedFilterCategory] = useState<
    'brand' | 'shape' | null
  >(null);

  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleConfirmFilter = () => {
    const filterQuery = {
      ...query,
      brand: selectedBrand,
      shape: selectedShape,
    };
    push(
      {
        pathname: pathname,
        query: Object.fromEntries(
          Object.entries(filterQuery).filter(([value]) => value !== undefined),
        ),
      },
      undefined,
      { shallow: true },
    );
    removeLastModal();
  };

  const renderFilterContent = () => {
    if (selectedFilterCategory === 'brand') {
      return <div></div>;
    }

    if (selectedFilterCategory === 'shape') {
      return (
        <>
          {shapesList.map((item, index) => (
            <div key={index} className="h-[52px] flex flex-col">
              <div className="h-[51.5px] flex items-center">
                <Radio
                  label={item}
                  checked={selectedShape === item}
                  handleChange={() => {
                    setSelectedShape(item);
                    setSelectedFilterCategory(null);
                  }}
                />
              </div>
              <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
            </div>
          ))}
        </>
      );
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
        <div
          className="h-6 w-6 flex items-center justify-center rounded-full bg-surface-tertiary"
          onClick={() => setSelectedFilterCategory(null)}
        >
          <ArrowRightIconOutline width={20} height={20} fill={colors.black} />
        </div>
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
              <span className="text-content-primary text-base leading-6">
                برند محصول
              </span>

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
                  {selectedShape}
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
