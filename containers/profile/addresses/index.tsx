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
import { Button } from '@com/_atoms/NewButton';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';
import ActionBar from '@com/Layout/ActionBar';

const AddressesContainer = () => {
  const { addModal } = useModal();
  const { push } = useRouter();

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

  const { data: addressData, isLoading } = useGetUserLocations();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Spinner className="w-full h-full flex justify-center items-center" />
      );
    }

    if (!isLoading && !addressData?.length) {
      <div className="text-red text-xs text-red-600 text-center py-8">
        در حال حاضر آدرسی برای شما ثبت نشده است
      </div>;
    }

    return (
      <>
        <div className="w-full pb-[84px]">
          <AddressList data={addressData} />
        </div>

        <ActionBar type="singleAction">
          <Button
            onClick={() => push(routeList.newAddress)}
            className="w-full"
            size="large"
            variant="primary"
          >
            ثبت آدرس جدید
          </Button>
        </ActionBar>
      </>
    );
  };

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => push(routeList.profile)}
      title={profileText?.addresses}
    >
      {renderContent()}
    </MainLayout>
  );
};
export default AddressesContainer;
