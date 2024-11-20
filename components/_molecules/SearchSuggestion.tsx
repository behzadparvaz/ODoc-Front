import { useGetSearchSuggestion } from '@api/search/searchApi.rq';
import EmptyContent from '@com/_atoms/EmptyContent';
import SearchSuggestionItem from '@com/_atoms/SearchSuggestionItem';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';

interface Props {
  className?: string;
  searchText: string;
}
const SearchSuggestion = ({ searchText, className = '' }: Props) => {
  const { data, isLoading } = useGetSearchSuggestion(searchText);

  return (
    <div className={`px-4 ${className}`}>
      <div className="w-full flex flex-col mt-3">
        {isLoading ? null : !data?.categories?.length &&
          !data?.suggestions?.length ? (
          <EmptyContent
            imgSrc="/images/search-empty-content.png"
            title={mobileSearchTexts?.noSearchResult}
          />
        ) : (
          <>
            {data?.suggestions?.map((item, index) => {
              return (
                <SearchSuggestionItem
                  type="suggestion"
                  className="mb-4"
                  code={item?.suggestionCode}
                  text={item?.suggestionName}
                  key={index}
                />
              );
            })}
            {data?.categories?.map((item, index) => {
              return (
                <SearchSuggestionItem
                  className="mb-4"
                  type="category"
                  code={item?.categoryCode}
                  text={item?.categoryName}
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default SearchSuggestion;
