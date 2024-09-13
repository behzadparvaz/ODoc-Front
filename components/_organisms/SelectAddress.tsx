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
      },
    });
  };

  return (
    <BottomModalContainer
      height={'300px'}
      hasCloseButton={true}
      title={homePageText?.selectAddress}
    >
      <Button
        handleClick={() => handleClickOpenModal()}
        className={`my-4`}
        size="medium"
        buttonType="contained"
        variant={'primary'}
      >
        افزودن آدرس
      </Button>

      {addressData?.map((item, index) => {
        const activeItem = defaultAddress?.id === item?.id;
        return (
          <AddressItem
            handleClickAddress={() => {
              dispatch(
                setUserAction({
                  defaultAddress: item,
                }),
              ),
                removeLastModal();
            }}
            key={index}
            className={`${activeItem ? 'bg-teal-100 border-teal-600' : ''}`}
            activeItem={activeItem}
            addressInfo={item}
          />
        );
      })}
    </BottomModalContainer>
  );
}
