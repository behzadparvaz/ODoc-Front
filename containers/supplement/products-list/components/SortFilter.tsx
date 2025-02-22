import { Radio } from '@com/_atoms/Radio';

enum SortEnum {
  BestSeller = 'BestSeller',
  MostVisited = 'MostVisited',
  MostDiscounted = 'MostDiscounted',
  MostExpensive = 'MostExpensive',
  Cheapest = 'Cheapest',
}

export type Sort = {
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
interface SortFilterProps {
  plpQuery?: any;
  onSelectSort: (item: Sort) => void;
}
const SortFilter = ({ plpQuery, onSelectSort }: SortFilterProps) => {
  return (
    <div className="flex flex-col gap-2 py-4 overflow-auto h-full">
      {sort.map((item, index) => (
        <div key={item?.sortCode} className="h-[52px] flex flex-col">
          <div className="h-[51.5px] flex items-center">
            <Radio
              label={item?.sortName}
              checked={plpQuery?.sortName === item?.sortCode}
              handleChange={() => onSelectSort(item)}
            />
          </div>
          {sort.length - 1 !== index && (
            <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
          )}
        </div>
      ))}
    </div>
  );
};
export default SortFilter;
