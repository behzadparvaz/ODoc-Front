import { ArrowTopRighttIconFill } from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  text: string;
  category?: string;
  code: string;
  type: 'category' | 'suggestion';
}

const SearchSuggestionItem = ({
  className = '',
  text,
  category,
  type,
  code,
}: Props) => {
  const { push } = useRouter();
  const isCategory = type === 'category';
  return (
    <div
      onClick={() =>
        push({
          pathname: isCategory ? routeList?.category : routeList?.search,
          query: {
            search: text,
            ...(isCategory ? { categoryCode: code } : { suggestionCode: code }),
          },
        })
      }
      className={`${className} flex flex-col`}
    >
      <p
        className={`text-sm text-grey-800 flex justify-between items-start pb-2`}
      >
        {text}

        <ArrowTopRighttIconFill
          width={24}
          height={24}
          fill={colors?.grey?.[500]}
        />
      </p>
      {category ? <p className="text-sm text-grey-500">{category}</p> : null}
    </div>
  );
};
export default SearchSuggestionItem;
