import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import { RootState } from '@utilities/types';
import { setLogMapStateAction, setMapStateAction } from '@redux/map/mapActions';
import {
  setCurrentLocation,
  setCurrentPosition,
} from '@utilities/userLocation';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { colors } from '@configs/Theme';
import { useGeoLocation } from '@hooks/useGeoLocation';
import useModal from '@hooks/useModal';
import {
  ArrowRightIconOutline,
  ArrowTopRightIcon,
  SearchIconOutline,
} from '@com/icons';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import { TextInput } from '@com/_atoms/NewTextInput';
import ParsiSearchModal from '@com/_organisms/ParsiSearchModal';
import { useRouter } from 'next/router';

const Map = dynamic(() => import('@com/_molecules/Map'), {
  ssr: false,
});
const Button = dynamic(() => import('@com/_atoms/Button'));

interface Props {
  addressId?: number;
  latitude?: number;
  longitude?: number;
}

const NewAddress = ({ addressId = 0, latitude, longitude }: Props) => {
  const dispatch = useDispatch();

  const { back } = useRouter();
  const [searchText, setSearchText] = useState('');
  const { addModal, removeLastModal } = useModal();

  const { geoLocationState } = useGeoLocation();
  const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(false);

  const { mapIsTouched } = useSelector((state: RootState) => state.mapInfo);

  const {
    handleClickOnSaveMyLocation,
    parsiMapLocationAddress,
    isLoadingMapsAddress,
  } = useMapApiCalls(addressId);

  const enableAutoLocationButton = () => {
    setIsLoadingPosition(false);
  };

  useEffect(() => {
    if (addressId === 0) {
      if (navigator) {
        navigator?.geolocation?.getCurrentPosition(
          (position) => {
            setCurrentPosition(position, dispatch);
          },
          null,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          },
        );
      }
    }
    dispatch(setLogMapStateAction(new Date().getTime()));
  }, [dispatch]);

  const handleClickAddress = (loc) => {
    const latLng: { latitude: number; longitude: number } = {
      latitude: loc.geo_location.center.lat,
      longitude: loc.geo_location.center.lng,
    };

    dispatch(
      setMapStateAction({
        viewport: latLng,
        defaultViewPort: latLng,
        mapIsTouched: true,
      }),
    );
  };

  const handleOpenSearchModal = () => {
    addModal({
      modal: ParsiSearchModal,
      props: {
        onChangeSearchText: (value: string) => setSearchText(value),
        onClickAddress: handleClickAddress,
      },
    });
  };

  return (
    <div className="h-svh w-full flex justify-center">
      <div className="relative bg-white grid grid-cols-1 gap-0 w-full sm:w-[460px] h-svh overflow-hidden ">
        <div className="h-[calc(100%-184px)] absolute inset-x-0 ">
          <div
            className="absolute top-2 right-4 h-10 w-10 flex justify-center items-center bg-white rounded-full z-10 shadow-md cursor-pointer"
            onClick={() => back()}
          >
            <ArrowRightIconOutline
              width={24}
              height={24}
              fill={colors?.black}
            />
          </div>
          <Map
            addressData={parsiMapLocationAddress}
            loadingAddress={isLoadingMapsAddress}
            addressId={addressId}
            latitude={latitude}
            longitude={longitude}
          />
          <Button
            style={{ direction: 'rtl' }}
            className="absolute bottom-10 right-4 !text-2xs !font-normal !text-grey-800 z-10 !px-3 bg-white"
            buttonType="contained"
            backgroundColor={colors.white}
            handleClick={() => {
              setIsLoadingPosition(true);
              setCurrentLocation(
                geoLocationState,
                dispatch,
                addModal,
                enableAutoLocationButton,
              );
            }}
            icon={
              <ArrowTopRightIcon width={24} height={24} fill={colors.black} />
            }
            iconDirection="right"
            size="medium"
          />
        </div>

        <FixBottomSection className="bg-white h-[184px]">
          <div className="w-full rounded-t-lg flex flex-col gap-y-10 px-4 py-6">
            <div className="cursor-pointer" onClick={handleOpenSearchModal}>
              <TextInput
                rightIcon={
                  <SearchIconOutline
                    width={24}
                    height={24}
                    fill={colors.black}
                  />
                }
                placeholder="جستجوی آدرس..."
                inputClassName="!rounded-full placeholder:text-lg placeholder-gray-500 pr-12"
                id="search-address"
                value={searchText}
                onChange={(e) => {
                  return;
                }}
                onClick={handleOpenSearchModal}
                autoComplete="off"
                disabled
              />
            </div>
            <Button
              className="w-full"
              size="large"
              variant="primary"
              color={colors.grey[50]}
              disabled={
                (addressId === 0 && !mapIsTouched) || isLoadingMapsAddress
              }
              handleClick={() => {
                handleClickOnSaveMyLocation();
              }}
              isLoading={isLoadingMapsAddress}
            >
              {selectStoreTexts?.confirmLocationContinue}
            </Button>
          </div>
        </FixBottomSection>
      </div>
    </div>
  );
};

export default NewAddress;
