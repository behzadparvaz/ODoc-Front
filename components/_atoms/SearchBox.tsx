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
      <a
        className={`w-full relative border border-grey-300 rounded-md flex gap-x-2 items-center px-3 py-2 text-sm text-grey-400 ${className}`}
      >
        <SearchIconOutline height={16} width={16} fill={colors?.grey[300]} />
        <p>{generalTexts?.drugSearch}</p>
      </a>
    </NextLink>
  );
};
export default SearchBox;
