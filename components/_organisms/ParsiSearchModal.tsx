import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';

import { MainLayout } from '@com/Layout';
import { FullModalContainer } from '@com/modal/containers/fullMobileContainer';
import { useGetParsiSearchAddress } from '@api/map/mapApis.rq';
import {
  LocationIcon,
  LocationOutline2Icon,
  SearchIconOutline,
} from '@com/icons';
import { colors } from '@configs/Theme';
import Spinner from '@com/_atoms/Spinner';
import useModal from '@hooks/useModal';
import NextImage from '@com/_core/NextImage';

const SearchBox = dynamic(() => import('@com/_atoms/SearchInput'));

type ParsiSearchModalProps = {
  onClickAddress?: (latLng: { latitude: number; longitude: number }) => void;
  onChangeSearchText: (value: string) => void;
};

const ParsiSearchModal = ({
  onClickAddress,
  onChangeSearchText,
}: ParsiSearchModalProps) => {
  const { removeLastModal } = useModal();
  const [searchText, setSearchText] = useState<string>('');

  const { data: addresses, isFetching: isGettingAddresses } =
    useGetParsiSearchAddress(searchText);

  const handleGetSearchSuggestion = (value) => {
    setSearchText(value);
  };

  const handleClickOnAddress = (item) => {
    onChangeSearchText(item?.geo_location?.title);
    onClickAddress(item);
    removeLastModal();
  };

  const renderContent = () => {
    if (isGettingAddresses) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      );
    }

    if (!isGettingAddresses && addresses && !addresses?.results?.length) {
      return (
        <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
          <NextImage
            src={'/static/images/staticImages/search-empty-content.png'}
            width={64}
            height={64}
            alt="search-empty-content"
          />
          <span className="text-xl  font-bold leading-8">
            نتیجه ای پیدا نشد
          </span>
          <span className="text-base text-grey-600">
            لطفا از نوشتار صحیح و اتصال به اینترنت مطمئن شوید
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {addresses?.results?.map((item, index) => (
          <div
            key={index}
            className="flex gap-x-5 items-center px-4 py-3 cursor-pointer"
            onClick={() => handleClickOnAddress(item)}
          >
            <div className="w-8 h-8 flex justify-center items-center bg-grey-50 rounded-full">
              <LocationOutline2Icon
                width={20}
                height={20}
                fill={colors.black}
              />
            </div>

            <div className="flex flex-col gap-y-2 ">
              <span className="text-base font-semibold">
                {item?.geo_location?.title}
              </span>

              <span className="text-sm font-medium">{item?.description}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <FullModalContainer>
      <MainLayout
        hasHeader
        headerType="withoutLogo"
        hasBackButton
        searchSection={
          <SearchBox
            autoFocus
            title="جستجوی آدرس"
            defualtValue={searchText}
            handleChange={(value) => handleGetSearchSuggestion(value)}
          />
        }
      >
        {renderContent()}
      </MainLayout>
    </FullModalContainer>
  );
};

export default ParsiSearchModal;
