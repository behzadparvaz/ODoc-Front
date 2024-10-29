import { useGetUserLocations } from '@api/user/user.rq';
import AddressItem from '@com/_atoms/AddressItem';
import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { homePageText } from '@com/texts/homePage';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { setUserAction } from '@redux/user/userActions';
import { RootState } from '@utilities/types';
import { useDispatch, useSelector } from 'react-redux';
import ParsiMapBottomSheet from './ParsiMapBottomSheet';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';
import { MainLayout } from '@com/Layout';

export default function SelectAddress() {
  const { data } = useGetUserLocations();
  const addressData: any = data;
  const { removeLastModal, addModal } = useModal();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);

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

  const handleClickAddress = (item) => {
    dispatch(
      setUserAction({
        defaultAddress: item,
      }),
    ),
      removeLastModal();
  };

  return (
    <FullModalContainer animation={FullModalAnimations.none}>
      <MainLayout
        hasHeader
        headerType="withoutLogo"
        hasBackButton
        backIconHandler={removeLastModal}
        title={homePageText?.selectAddress}
      >
        <Button
          handleClick={() => handleClickOpenModal()}
          className={`my-4 mx-4`}
          size="medium"
          buttonType="contained"
          variant={'primary'}
        >
          افزودن آدرس
        </Button>

        <div className="overflow-y-scroll">
          {addressData?.map((item, index) => {
            const activeItem = defaultAddress?.id === item?.id;
            return (
              <div key={index} onClick={() => handleClickAddress(item)}>
                <AddressItem activeItem={activeItem} addressInfo={item} />
              </div>
            );
          })}
        </div>
      </MainLayout>
    </FullModalContainer>
  );
}
