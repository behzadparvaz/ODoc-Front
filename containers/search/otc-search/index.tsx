import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { routeList } from '@routes/routeList';
import { MainLayout } from '@com/Layout';
import ProductList from '@com/_organisms/ProductList';
import { ChevronLeftIconOutline } from '@com/icons';

const SearchBox = dynamic(() => import('@com/_atoms/SearchInput'));
const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));

const otcMockData = [
  { text: 'ژلوفن', id: 0 },
  { text: 'استامینوفن', id: 1 },
  { text: 'ستیریزین', id: 2 },
];

const supplementMockData = [
  { text: 'امگا 3', id: 0 },
  { text: 'ویتامین ث', id: 1 },
  { text: 'منیزیم', id: 2 },
];

const SearchContainer = () => {
  const { push, query, pathname } = useRouter();

  const [searchText, setSearchText] = useState<string>('');

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

  useEffect(() => {
    if (query?.searchText) {
      setSearchText(query?.searchText as string);
    }
  }, [query?.searchText]);

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => {
        const { searchText, section, ...rest } = query;

        if (query?.section === 'supplement') {
          if (query?.categoryCodeLevel2) {
            push({
              pathname: routeList?.supplementProductListPage,
              query: { ...rest },
            });
          } else {
            push({
              pathname: routeList?.supplementPage,
            });
          }
        } else if (query?.section === 'otc') {
          push({
            pathname: routeList?.otcMedicine,
          });
        } else if (query?.section === 'otc-products') {
          push({
            pathname: routeList?.otcMedicineProductsList,
            query: { ...rest },
          });
        } else {
          push({
            pathname: routeList?.homeRoute,
          });
        }
      }}
      searchSection={
        <SearchBox
          defualtValue={searchText}
          handleChange={(value) => handleGetSearchSuggestion(value)}
        />
      }
    >
      <SectionTitle
        className="px-4 mb-2 mt-4"
        titleClassName="font-medium"
        title="جستجوهای پرطرفدار"
      />

      <ScrollSlider className="gap-x-2 px-4 mt-2">
        {(query?.section === 'supplement'
          ? supplementMockData
          : otcMockData
        )?.map((item) => {
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
              className="flex justify-between items-center px-3 py-1 rounded-full border border-grey-100 text-black text-xs cursor-pointer"
            >
              {item?.text}
              <ChevronLeftIconOutline width={24} height={24} fill="#000" />
            </div>
          );
        })}
      </ScrollSlider>

      {searchText?.length >= 2 && (
        <div className="mb-16">
          <ProductList searchTerm={searchText} />
        </div>
      )}
    </MainLayout>
  );
};
export default SearchContainer;
