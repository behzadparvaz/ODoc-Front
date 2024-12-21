import { useGetUserLocation } from '@api/user/user.rq';
import { MainLayout } from '@com/Layout';
import { useRouter } from 'next/router';
import AddressModal from '../components/AddressModal';

const EditAddressContainer = () => {
  const { query } = useRouter();
  const addressId = query?.addressId;

  const { data, isLoading } = useGetUserLocation(addressId as string);
  console.log('data', data);

  return (
    <MainLayout
      title="ویرایش آدرس"
      headerType="withoutLogo"
      hasHeader
      hasAddress
      hasBackButton
    >
      <AddressModal
        addressId={addressId as string}
        latitude={data?.latitude}
        longitude={data?.longitude}
      />
    </MainLayout>
  );
};

export default EditAddressContainer;
