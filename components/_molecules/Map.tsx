import { ReactElement } from 'react';
// import MapSearch from '@com/_molecules/MapSearch.nd';

import ParsiMapContent from './ParsiMapContent';

type Props = {
  addressData?: any;
  loadingAddress?: boolean;
  addressId?: number;
  latitude?: number;
  longitude?: number;
};

function Map({ addressData, loadingAddress = false, addressId = 0, latitude, longitude }: Props): ReactElement {
  return (
    <>
      <ParsiMapContent addressId={addressId} parsiMapAddressData={addressData} loadingAddress={loadingAddress} />
      {/* <MapSearch /> */}
    </>
  );
}

export default Map;
