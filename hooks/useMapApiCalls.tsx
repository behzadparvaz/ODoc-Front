import { isEmpty } from '@utilities/isEmptyObject';
import { RootState } from '@utilities/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from './useModal';
import useNotification from './useNotification';
import AddressDetailsModal from '@com/_organisms/AddressDetailsModal';
import { useGetParsiMapLocation } from '@api/map/mapApis.rq';
function useMapApiCalls(addressId: number) {
  const { openNotification } = useNotification();
  const { replaceLastModal } = useModal();
  const [mapAddressesText, setMapAddressesText] = useState<string>();
  const { viewport } = useSelector((state: RootState) => state.mapInfo);

  const { data: ParsiMapAddressData, isLoading: parsiIsLoadingMapAddress } =
    useGetParsiMapLocation(`${[viewport.longitude, viewport.latitude]}`);

  const handleClickOnSaveMyLocation = async () => {
    if (
      ParsiMapAddressData?.subdivisions?.shahrestan?.code !== '2301' ||
      ParsiMapAddressData?.subdivisions?.shahr?.code !== '2301021576' ||
      ParsiMapAddressData?.subdivisions?.bakhsh?.code !== '230102'
    ) {
      openNotification({
        message: 'در حال حاضر خدمات این سرویس تنها در شهر تهران فعال میباشد.',
        type: 'error',
        notifType: 'successOrFailedMessage',
      });
      return;
    }
    const locationAddress = ParsiMapAddressData?.address;
    if (locationAddress || !isEmpty(ParsiMapAddressData)) {
      const locationAddress = ParsiMapAddressData?.address;

      const errorInSelectedLocation = ParsiMapAddressData?.status !== 'OK';

      if (locationAddress || !isEmpty(ParsiMapAddressData)) {
        const data = ParsiMapAddressData;

        if (errorInSelectedLocation) {
          openNotification({
            message: 'selectStoreTexts.chooseLocationOnMapError',
            type: 'error',
            notifType: 'successOrFailedMessage',
          });
          return;
        }
        {
          replaceLastModal({
            modal: AddressDetailsModal,
            props: {
              addressData: data,
              addressId,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    let addressText = `${ParsiMapAddressData?.address ? ParsiMapAddressData?.address : ''}`;
    setMapAddressesText(addressText);
  }, [ParsiMapAddressData]);

  return {
    parsiMapLocationAddress: ParsiMapAddressData,
    isLoadingMapsAddress: parsiIsLoadingMapAddress,
    mapAddressesText,
    handleClickOnSaveMyLocation,
    setMapAddressesText,
  };
}

export default useMapApiCalls;
