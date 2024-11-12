import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetSupplementProductsShapes } from '@api/supplement/supplementApis.rq';
import { TextInput } from '@com/_atoms/NewTextInput';
import { Radio } from '@com/_atoms/Radio';

type Shapes = {
  shapeName?: string;
  shapeCode?: string;
};

const shimerData = ['1', '2', '3', '4', '5'];

type ShapesFilterProps = {
  onSelectShape: (item: Shapes) => void;
};

const ShapesFilter = ({ onSelectShape }: ShapesFilterProps) => {
  const { query } = useRouter();
  const { data: shapesData, isLoading: shapesIsLoading } =
    useGetSupplementProductsShapes(
      Object.fromEntries(
        Object.entries(query).filter(
          ([key, value]) =>
            value !== undefined &&
            (key === 'categoryCodeLevel4' || key === 'categoryCodeLevel3'),
        ),
      ),
    );

  const [selectedShape, setSelectedShape] = useState<Shapes>(null);
  const [filteredShapes, setFilteredShapes] = useState<Shapes[] | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.value) {
      setFilteredShapes(shapesData);
    } else {
      const filteredItems = shapesData?.filter((item) =>
        item?.shapeName
          ?.toLowerCase()
          ?.includes(event?.target?.value?.toLowerCase()),
      );
      setFilteredShapes(filteredItems);
    }
  };

  const handleSelectShape = (item: Shapes) => {
    if (item?.shapeCode !== selectedShape?.shapeCode) {
      setSelectedShape(item);
      onSelectShape(item);
    }
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
    <div className="flex flex-col gap-2 py-4">
      <TextInput
        placeholder="جستجو"
        onChange={handleSearch}
        id="search"
        name="firstName"
      />

      <div className="h-[300px] overflow-y-scroll overflow-x-hidden">
        {shapesIsLoading ? (
          renderShimer()
        ) : (
          <>
            {(!!filteredShapes?.length ? filteredShapes : shapesData)?.map(
              (item) => (
                <div key={item?.shapeCode} className="h-[52px] flex flex-col">
                  <div className="h-[51.5px] flex items-center">
                    <Radio
                      label={item?.shapeName}
                      checked={selectedShape === item}
                      handleChange={() => handleSelectShape(item)}
                    />
                  </div>
                  <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
                </div>
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default ShapesFilter;
