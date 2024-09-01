import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  text: string;
  category: string;
}

const SearchSuggestionItem = ({ className = '', text, category }: Props) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() =>
        push({
          pathname: routeList?.search,
          query: {
            search_text: text,
          },
        })
      }
      className={`${className} flex flex-col gap-y-1`}
    >
      <p className="text-sm text-grey-800">{text}</p>
      <p className="text-xs text-grey-400 font-semibold">{category}</p>
    </div>
  );
};
export default SearchSuggestionItem;
