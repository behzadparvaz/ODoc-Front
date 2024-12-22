import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { setMapStateAction } from '@redux/map/mapActions';
import { useGetUserLocation } from '@api/user/user.rq';
import { MainLayout } from '@com/Layout';
import Spinner from '@com/_atoms/Spinner';

import AddressModal from '../components/AddressModal';

const EditAddressContainer = () => {
  const { query } = useRouter();
  const addressId = query?.addressId;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetUserLocation(addressId as string);

  const handleSetViewport = () => {
    dispatch(
      setMapStateAction({
        viewport: {
          latitude: data?.latitude,
          longitude: data?.longitude,
        },
        mapIsTouched: false,
      }),
    );
  };

  useEffect(() => {
    if (data) {
      handleSetViewport();
    }
  }, [data]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-full w-full">
          <Spinner className="w-full h-full flex justify-center items-center" />
        </div>
      );
    }

    return <AddressModal addressId={addressId as string} initialData={data} />;
  };

  return <MainLayout>{renderContent()}</MainLayout>;
};

export default EditAddressContainer;
