import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { RootState } from '@utilities/types';
import { setLogMapStateAction } from '@redux/map/mapActions';
import {
  setCurrentLocation,
  setCurrentPosition,
} from '@utilities/userLocation';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { colors } from '@configs/Theme';
import { useGeoLocation } from '@hooks/useGeoLocation';
import useModal from '@hooks/useModal';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { Discovery } from '@com/icons';
import { useGetParsiSearchAddress } from '@api/map/mapApis.rq';
import AutoComplete from '@com/_molecules/AutoComplete';
import { Location } from '@utilities/interfaces/location';

const Map = dynamic(() => import('@com/_molecules/Map'), {
  ssr: false,
});
const Button = dynamic(() => import('@com/_atoms/Button'));

interface Props {
  addressId?: number;
  latitude?: number;
  longitude?: number;
  onChangeLoc?: (latLng: { latitude: number; longitude: number }) => void;
  initialData?: Location;
}

export default function ParsiMapBottomSheet({
  addressId = 0,
  latitude,
  longitude,
  onChangeLoc,
  initialData,
}: Props) {
  const dispatch = useDispatch();
  const [searchTxt, setSearchTxt] = useState('');
  const { addModal } = useModal();
  const { geoLocationState } = useGeoLocation();
  const [isLoadingPosition, setIsLoadingPosition] = useState<boolean>(false);
  const { mapIsTouched } = useSelector((state: RootState) => state.mapInfo);
  const {
    handleClickOnSaveMyLocation,
    parsiMapLocationAddress,
    isLoadingMapsAddress,
  } = useMapApiCalls(addressId, initialData);

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

  const { data: addresses, isFetching: isGettingAddresses } =
    useGetParsiSearchAddress(searchTxt);

  const onClickAddress = (loc) => {
    onChangeLoc?.({
      longitude: loc.geo_location.center.lng,
      latitude: loc.geo_location.center.lat,
    });
  };

  return (
    <BottomModalContainer
      height={'88%'}
      hasCloseButton={true}
      title={selectStoreTexts?.saveLocationOnMap}
      className="!overflow-hidden !pt-5 !max-h-[704px]"
      style={{ direction: 'ltr' }}
    >
      <div className="h-[calc(100%-60px)] absolute inset-x-0 mt-4">
        <AutoComplete
          suggestions={(addresses?.results as any) ?? []}
          className="w-11/12 absolute z-50 top-3 left-1/2 -translate-x-1/2"
          inputProps={{
            placeholder: 'آدرس خود را وارد کنید',
            dir: 'rtl',
            className: 'shadow-none',
          }}
          onSelect={onClickAddress}
          onChange={(event) => setSearchTxt(event.target.value)}
          getOptionLabel={(option) => option.description}
        />

        <Map
          addressData={parsiMapLocationAddress}
          loadingAddress={isLoadingMapsAddress}
          addressId={addressId}
          latitude={latitude}
          longitude={longitude}
        />
        <Button
          style={{ direction: 'rtl' }}
          className="absolute bottom-[120px] right-5 !text-2xs !font-normal !text-grey-800 z-10 !px-3"
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
          icon={<Discovery width={16} height={16} fill={colors.grey[800]} />}
          iconDirection="right"
          size="medium"
        >
          موقعیت‌یابی خودکار
        </Button>
        <div
          className={`fixed inset-x-0 px-6 bottom-6 truncate z-10 flex justify-center ${
            shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
          } `}
        >
          <Button
            className="w-full max-w-[428px]"
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
      </div>
    </BottomModalContainer>
  );
}
