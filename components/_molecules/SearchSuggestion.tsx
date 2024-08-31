import SearchSuggestionItem from '@com/_atoms/SearchSuggestionItem';
import { SearchIconOutline } from '@com/icons';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import { colors } from '@configs/Theme';

interface Props {
  className?: string;
  searchText: string | string[];
}
const SearchSuggestion = ({ searchText, className = '' }: Props) => {
  const mockData = [
    {
      text: 'تست 1',
      id: 1,
      category: 'دسته بندی تست 1',
    },
    {
      text: 'تست 2',
      id: 2,
      category: 'دسته بندی تست 2',
    },
    {
      text: 'تست 3',
      id: 3,
      category: 'دسته بندی تست 3',
    },
    {
      text: 'تست 4',
      id: 4,
      category: 'دسته بندی تست 4',
    },
    {
      text: 'تست 1',
      id: 5,
      category: 'دسته بندی تست 1',
    },
  ];

  return (
    <div className={`px-4 ${className}`}>
      <p className="flex gap-x-2 items-center text-grey-600 text-sm">
        <SearchIconOutline height={22} width={22} fill={colors?.grey[600]} />
        {mobileSearchTexts?.searchFor}
        <span className="font-semibold">"{searchText}"</span>
      </p>
      <div className="w-full flex flex-col mt-3">
        {mockData?.map((item) => {
          return (
            <SearchSuggestionItem
              className="border-b border-grey-200 py-1"
              category={item?.category}
              text={item?.text}
              key={item?.id}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SearchSuggestion;
