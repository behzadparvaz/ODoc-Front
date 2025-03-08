import { isEmpty } from '@utilities/isEmptyObject';
import { RootState } from '@utilities/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useModal from './useModal';
import useNotification from './useNotification';
import AddressDetailsModal from '@com/_organisms/AddressDetailsModal';
import { useGetParsiMapLocation } from '@api/map/mapApis.rq';
import { Location } from '@utilities/interfaces/location';

const activeCities = [
  // تهران
  {
    shahrestan: '2301',
    bakhsh: '230102',
    shahr: '2301021576',
  },
  // مشهد
  {
    shahrestan: '916',
    bakhsh: '91605',
    shahr: '916051392',
  },
];

function useMapApiCalls(addressId: number | string, initialData?: Location) {
  const { openNotification } = useNotification();
  const { replaceLastModal } = useModal();
  const [mapAddressesText, setMapAddressesText] = useState<string>();
  const { viewport } = useSelector((state: RootState) => state.mapInfo);
  const { data: ParsiMapAddressData, isLoading: parsiIsLoadingMapAddress } =
    useGetParsiMapLocation(`${[viewport.longitude, viewport.latitude]}`);

  const handleClickOnSaveMyLocation = async () => {
    if (
      activeCities?.every((item) => {
        const isActiveCity =
          ParsiMapAddressData?.subdivisions?.shahrestan?.code !==
            item?.shahrestan ||
          ParsiMapAddressData?.subdivisions?.bakhsh?.code !== item?.bakhsh ||
          ParsiMapAddressData?.subdivisions?.shahr?.code !== item?.shahr;

        return isActiveCity;
      })
    ) {
      openNotification({
        message:
          'در حال حاضر خدمات این سرویس تنها در شهرهای تهران و مشهد فعال میباشد.',
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
              initialData: initialData,
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
