import NextLink from '@com/_core/NextLink';
import { SearchIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';

interface Props {
  className?: string;
}

const SearchBox = ({ className = '' }: Props) => {
  return (
    <NextLink href={routeList?.mobileSearch}>
      <a
        className={`w-full relative bg-grey-100 rounded-full flex gap-x-2 items-center px-3 py-3 text-lg text-grey-500 ${className}`}
      >
        <SearchIconOutline height={24} width={24} fill={'#535454'} />
        <p className='font-bold'>{generalTexts?.drugSearch} ...</p>
      </a>
    </NextLink>
  );
};
export default SearchBox;
