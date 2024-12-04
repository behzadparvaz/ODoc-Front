import { Radio } from '@com/_atoms/Radio';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import { useRouter } from 'next/router';
import { useState } from 'react';

enum SortEnum {
  BestSeller = 'BestSeller',
  MostVisited = 'MostVisited',
  MostDiscounted = 'MostDiscounted',
  MostExpensive = 'MostExpensive',
  Cheapest = 'Cheapest',
}

type Sort = {
  sortName: string;
  sortCode: SortEnum;
};

const sort = [
  { sortName: 'پرفروش ترین', sortCode: SortEnum.BestSeller },
  { sortName: 'پربازدیدترین', sortCode: SortEnum.MostVisited },
  { sortName: 'پرتخفیف ترین', sortCode: SortEnum.MostDiscounted },
  { sortName: 'گران ترین', sortCode: SortEnum.MostExpensive },
  { sortName: 'ارزان ترین', sortCode: SortEnum.Cheapest },
];

type SortBottomsheetProps = {
  plpQuery?: any;
};

const SortBottomsheet = ({ plpQuery }: SortBottomsheetProps) => {
  const { push, query, pathname } = useRouter();

  const { removeLastModal } = useModal();

  const [selectedSort, setSelectedSort] = useState<Sort | null>(
    plpQuery ?? null,
  );

  const handleSelectSort = (item: Sort) => {
    if (selectedSort?.sortCode !== item?.sortCode) {
      setSelectedSort(item);
      push(
        {
          pathname: pathname,
          query: {
            ...query,
            sortCode: item?.sortCode,
            sortName: item?.sortName,
          },
        },
        undefined,
        { shallow: true },
      );
      removeLastModal();
    }
  };

  return (
    <BottomModalContainer
      height="auto"
      minHeight={300}
      title="مرتب سازی بر اساس"
    >
      {sort.map((item) => (
        <div key={item?.sortCode} className="h-[52px] flex flex-col">
          <div className="h-[51.5px] flex items-center">
            <Radio
              label={item?.sortName}
              checked={selectedSort?.sortCode === item?.sortCode}
              handleChange={() => handleSelectSort(item)}
            />
          </div>
          <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
        </div>
      ))}
    </BottomModalContainer>
  );
};

export default SortBottomsheet;
