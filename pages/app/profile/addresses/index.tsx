import { useDispatch, useSelector } from 'react-redux';

import { profileText } from '@com/texts/profileText';
import { useGetUserLocations } from '@api/user/user.rq';
import ParsiMapBottomSheet from '@com/_organisms/ParsiMapBottomSheet';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { RootState } from '@utilities/types';
import AddressList from '@com/_organisms/AddressList';
import Spinner from '@com/_atoms/Spinner';
import { MainLayout } from '@com/Layout';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import { Button } from '@com/_atoms/NewButton';

const Addresses = () => {
  const { addModal } = useModal();
  const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);
  const dispatch = useDispatch();

  const handleClickOpenModal = () => {
    dispatch(
      setMapStateAction({ viewport: defaultViewPort, mapIsTouched: false }),
    );
    addModal({
      modal: ParsiMapBottomSheet,
      props: {
        latitude: defaultViewPort.latitude,
        longitude: defaultViewPort.longitude,
        addressId: 0,
        onChangeLoc: (latLng) =>
          dispatch(
            setMapStateAction({
              viewport: latLng,
              defaultViewPort: latLng,
              mapIsTouched: true,
            }),
          ),
      },
    });
  };

  const {
    data: addressData,
    isLoading,
    refetch: refetchAddresses,
  } = useGetUserLocations();

  const renderContent = () => {
    if (isLoading) {
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />;
      </div>;
    }

    if (!isLoading && !addressData?.length) {
      <div className="text-red text-sm text-red-600 text-center py-8">
        در حال حاضر آدرسی برای شما ثبت نشده است
      </div>;
    }

    return (
      <>
        <AddressList data={addressData} />

        <FixBottomSection className="p-4">
          <Button
            onClick={() => handleClickOpenModal()}
            className="w-full"
            size="large"
            variant="primary"
          >
            ثبت آدرس جدید
          </Button>
        </FixBottomSection>
      </>
    );
  };

  return (
    <MainLayout
      hasBottomGap
      hasHeader
      hasBackButton
      title={profileText?.addresses}
    >
      {renderContent()}
    </MainLayout>
  );
};
export default Addresses;
