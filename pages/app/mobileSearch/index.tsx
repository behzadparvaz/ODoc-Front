import dynamic from 'next/dynamic';
import { ArrowRightIconOutline, SearchIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import { routeList } from '@routes/routeList';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';

const EmptyContent = dynamic(
  () => import('@com/_atoms/EmptyContent'),
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
    push(`${routeList?.searchByImage}/${1236}`);
  };

  const handleGetSearchSuggestion = (value) => {
    setSearchText(value);
  };
  const showResult = searchText?.length >= 2;
  return (
    <div
      className={`w-full ${showResult ? 'pt-[110px]' : ' pt-[58px]'} min-h-screen bg-white ${
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
      }`}
    >
      <div className="w-full fixed inset-x-0 top-0 py-4 bg-white z-10">
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
          {searchText?.length ? (
            <Button
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
            </Button>
          ) : null}
        </div>
        {showResult ? (
          <p className="flex gap-x-1 items-center text-black text-sm mt-4 px-4">
            <SearchIconOutline height={24} width={24} fill={'#000'} />
            {mobileSearchTexts?.searchFor}
            <span className="font-semibold">«{searchText}»</span>
          </p>
        ) : null}
      </div>
      {showResult && (
        <SearchSuggestion className="pt-1" searchText={searchText} />
      )}

      {searchText?.length < 2 && (
        <>
          <PapularSearch className="mt-6" />
          <EmptyContent imgSrc='/static/images/staticImages/search-empty-content.png' title={mobileSearchTexts?.noSearch} />
        </>
      )}
    </div>
  );
};
export default MobileSearch;
