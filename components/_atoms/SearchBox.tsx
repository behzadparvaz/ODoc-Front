import { SearchIconOutline } from '@com/icons';
import { homePageTexts } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import Link from 'next/link';

interface Props {
  className?: string;
}

const SearchBox = ({ className = '' }: Props) => {
  return (
    <Link href={'/app'}>
      <a
        className={`w-full relative border border-grey-300 rounded-md flex gap-x-2 items-center px-3 py-2 text-sm text-grey-400 ${className}`}
      >
        <SearchIconOutline height={16} width={16} fill={colors?.grey[300]} />
        <p>{homePageTexts?.drugSearch}</p>
      </a>
    </Link>
  );
};
export default SearchBox;
