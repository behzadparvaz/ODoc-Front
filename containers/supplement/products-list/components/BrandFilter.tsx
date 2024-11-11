import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetSupplementProductsBrands } from '@api/supplement/supplementApis.rq';
import { TextInput } from '@com/_atoms/NewTextInput';
import { Radio } from '@com/_atoms/Radio';

const shimerData = ['1', '2', '3', '4', '5'];

type BrandFilterProps = {
  onSelectBrand: (item: string) => void;
};

const BrandFilter = ({ onSelectBrand }: BrandFilterProps) => {
  const { query } = useRouter();
  const { data: brandData, isLoading: brandIsLoading } =
    useGetSupplementProductsBrands(
      Object.fromEntries(
        Object.entries(query).filter(
          ([key, value]) =>
            value !== undefined &&
            (key === 'categoryCodeLevel4' || key === 'categoryCodeLevel3'),
        ),
      ),
    );

  const [selectedBrand, setSelectedBrand] = useState<string>(null);
  const [filteredBrands, setFilteredBrands] = useState<string[] | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.value) {
      setFilteredBrands(brandData);
    } else {
      const filteredItems = brandData?.filter((item) =>
        item?.toLowerCase()?.includes(event?.target?.value?.toLowerCase()),
      );
      setFilteredBrands(filteredItems);
    }
  };

  const handleSelectShape = (item: string) => {
    if (item !== selectedBrand) {
      setSelectedBrand(item);
      onSelectBrand(item);
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
        {brandIsLoading ? (
          renderShimer()
        ) : (
          <>
            {(!!filteredBrands?.length ? filteredBrands : brandData)?.map(
              (item) => (
                <div key={item} className="h-[52px] flex flex-col">
                  <div className="h-[51.5px] flex items-center">
                    <Radio
                      label={item}
                      checked={selectedBrand === item}
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
export default BrandFilter;
