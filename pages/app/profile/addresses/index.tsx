import { profileText } from '@com/texts/profileText';
import { useGetUserLocations } from '@api/user/user.rq';
import ParsiMapBottomSheet from '@com/_organisms/ParsiMapBottomSheet';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { RootState } from '@utilities/types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@com/_atoms/Button';
import AddressList from '@com/_organisms/AddressList';
import Spinner from '@com/_atoms/Spinner';
import { MainLayout } from '@com/Layout';

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
  const { data: addressData, isLoading } = useGetUserLocations();
  const addressItem: any = addressData;
  return (
    <MainLayout
      hasBottomNavigation
      hasHeader
      hasBackButton
      title={profileText?.addresses}
    >
      {isLoading === false ? (
        <div className="px-4">
          {!addressItem?.length ? (
            <div className="text-red text-sm text-red-600 text-center py-8">
              در حال حاضر آدرسی برای شما ثبت نشده است
            </div>
          ) : null}
          <Button
            handleClick={() => handleClickOpenModal()}
            className={`${addressItem?.length ? 'mb-4' : 'w-full'} mt-4`}
            size="large"
            buttonType="contained"
            variant={'primary'}
          >
            افزودن آدرس
          </Button>

          {addressItem?.length ? <AddressList data={addressItem} /> : null}
        </div>
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default Addresses;
