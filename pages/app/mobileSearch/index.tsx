import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { routeList } from '@routes/routeList';
import { MainLayout } from '@com/Layout';
import ProductList from '@com/_organisms/ProductList';
import { ChevronLeftIconOutline } from '@com/icons';

const SearchBox = dynamic(() => import('@com/_atoms/SearchInput'));
const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));

const mockData = [
  { text: 'ژلوفن', id: 0 },
  { text: 'استامینوفن', id: 1 },
  { text: 'ستیریزین', id: 2 },
];

const MobileSearch = () => {
  const { push, query, pathname } = useRouter();

  const [searchText, setSearchText] = useState<string>(
    (query.searchText as string) ?? '',
  );

  const handleSearchByImage = (e) => {
    push(`${routeList?.searchByImage}/${1236}`);
  };

  const handleGetSearchSuggestion = (value) => {
    setSearchText(value);
    push(
      {
        pathname: pathname,
        query: {
          ...query,
          searchText: value,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <MainLayout
      hasHeader
      hasBackButton
      hasSerachSection
      handleClickRightIcon={() => push('/app')}
      searchSection={
        <SearchBox
          defualtValue={searchText}
          handleChange={(value) => handleGetSearchSuggestion(value)}
        />
      }
    >
      <SectionTitle
        className="px-4 mb-2"
        titleClassName="font-bold"
        title="جستجوهای پرطرفدار"
      />

      <ScrollSlider className="gap-x-2 px-4">
        {mockData?.map((item) => {
          return (
            <div
              key={item?.id}
              onClick={() => {
                setSearchText(item?.text);
                push(
                  {
                    pathname: pathname,
                    query: {
                      ...query,
                      searchText: item?.text,
                    },
                  },
                  undefined,
                  { shallow: true },
                );
              }}
              className="flex justify-center items-center px-3 py-1 rounded-full border border-grey-100 text-black text-sm cursor-pointer"
            >
              {item?.text}
              <ChevronLeftIconOutline width={24} height={24} fill="#000" />
            </div>
          );
        })}
      </ScrollSlider>

      {searchText?.length >= 2 && <ProductList searchTerm={searchText} />}
    </MainLayout>
  );
};
export default MobileSearch;
