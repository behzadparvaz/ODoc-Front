import NextLink from '@com/_core/NextLink';
import { SearchIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';

interface Props {
  className?: string;
}

const SearchBox = ({ className = '' }: Props) => {
  return (
    <span
      className={`h-[48px] w-full relative bg-grey-100 rounded-full flex gap-x-2 items-center px-3 py-3 text-sm text-grey-500 ${className}`}
    >
      <SearchIconOutline height={24} width={24} fill={colors?.grey?.[600]} />
      <p className="font-medium">{generalTexts?.drugSearch} ...</p>
    </span>
  );
};
export default SearchBox;
