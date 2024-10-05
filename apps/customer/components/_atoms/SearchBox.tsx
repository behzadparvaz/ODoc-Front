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
    <NextLink href={routeList?.mobileSearch}>
      <span
        className={`w-full relative bg-grey-100 rounded-full flex gap-x-2 items-center px-3 py-3 text-lg text-grey-500 ${className}`}
      >
        <SearchIconOutline height={24} width={24} fill={colors?.grey?.[600]} />
        <p className="font-medium">{generalTexts?.drugSearch} ...</p>
      </span>
    </NextLink>
  );
};
export default SearchBox;
