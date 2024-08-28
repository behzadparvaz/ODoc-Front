import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import { routeList } from '@routes/routeList';
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from '@configs/ControlMobileView';

const EmptyContentMobileSearch = dynamic(
  () => import('@com/_atoms/EmptyContentMobileSearch'),
);
const SearchBox = dynamic(() => import('@com/_atoms/SearchInput'));
const PapularSearch = dynamic(() => import('@com/_molecules/PapularSearch'));
const SearchSuggestion = dynamic(
  () => import('@com/_molecules/SearchSuggestion'),
);
const Button = dynamic(() => import('@com/_atoms/Button'));

const MobileSearch = () => {
  const { back, query, push } = useRouter();

  const searchTextQuery: string = query?.search_text
    ? String(query?.search_text)
    : null;

  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    if (searchTextQuery !== null) {
      setSearchText(searchTextQuery);
    }
  }, [query]);
  const handleSearchByImage = (e) => {
    // console.log(e?.target?.files?.[0]);
    push(`${routeList?.searchByImage}/${1236}`);
  };

  const handleGetSearchSuggestion = (value) => {
    setSearchText(value);
  };

  return (
    <div
      className={`w-full pt-4 min-h-screen bg-white ${
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
      }`}
    >
      <div className="flex relative pl-4 pr-3 items-center gap-x-2">
        <Button className="!p-0" handleClick={back}>
          <ArrowRightIconOutline
            height={24}
            width={24}
            fill={colors?.grey[600]}
          />
          
        </Button>
        <SearchBox
          defualtValue={searchText}
          handleChange={(value) =>
            value !== undefined && handleGetSearchSuggestion(value)
          }
        />
        {searchText?.length?<Button
          variant="primary"
          className="absolute left-6 !px-1.5 hidden"
          size="small"
          buttonType="contained"
          handleClick={(e) => e.prventDefault}
        >
          <input
            onChange={(e) => handleSearchByImage(e)}
            type="file"
            className="absolute opacity-0 inset-0 w-full h-full"
            accept="image/*;capture=camera"
          />
          {mobileSearchTexts?.searchByImage}
        </Button>:null}
      </div>
      {/* {searchText?.length >= 2 && (
        <SearchSuggestion className="mt-4" searchText={searchText} />
      )} */}

      {searchText?.length < 2 && (
        <>
          <PapularSearch className="mt-6" />
          <EmptyContentMobileSearch />
        </>
      )}
    </div>
  );
};
export default MobileSearch;
