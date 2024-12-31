import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useGetUserLocations } from '@api/user/user.rq';
import AddressItem from '@com/_atoms/AddressItem';
import Button from '@com/_atoms/Button';
import { homePageText } from '@com/texts/homePage';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { setUserAction } from '@redux/user/userActions';
import { RootState } from '@utilities/types';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';
import { MainLayout } from '@com/Layout';
import useStorage from '@hooks/useStorage';
import { routeList } from '@routes/routeList';
import { Location } from '@utilities/interfaces/location';

import ParsiMapBottomSheet from './ParsiMapBottomSheet';
import getFutureTime from '@utilities/getFutureTime';

const SelectAddress = () => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);

  const {
    data: addressList = [],
    isLoading,
    isPending,
    isFetching,
  } = useGetUserLocations();
  const { removeLastModal, addModal } = useModal();

  // Redirect to login if token is not available
  useEffect(() => {
    if (!token) {
      push(routeList?.loginRoute);
      removeLastModal();
    }
  }, [token, push, removeLastModal]);

  // Handle opening the modal with the selected location
  const handleClickOpenModal = (item?: Location) => {
    const viewport = item
      ? {
          latitude: item.latitude,
          longitude: item.longitude,
          id: item.id,
          name: item.name,
        }
      : defaultViewPort;

    dispatch(setMapStateAction({ viewport, mapIsTouched: !!item }));

    addModal({
      modal: ParsiMapBottomSheet,
      props: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        addressId: item?.id ?? 0,
        initialData: item,
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

  // Handle selecting an address
  const handleClickAddress = (item) => {
    dispatch(
      setUserAction({
        defaultAddress: {
          ...item,
          lastSelectedTime: getFutureTime(0, 'now').getTime,
        },
      }),
    );
    removeLastModal();
  };

  // Render loading shimmer effect
  const renderShimmerEffect = () =>
    [...Array(5)].map((_, idx) => (
      <div key={idx} className="flex px-5 mb-4">
        <div className="m-auto">
          <div className="h-[45px] w-[45px] bg-surface-secondary rounded-full" />
        </div>
        <div className="flex flex-col w-full gap-y-2 mx-4">
          <div className="h-[24px] w-full max-w-24 bg-surface-secondary rounded-xl" />
          <div className="h-[24px] w-full bg-surface-secondary rounded-xl" />
        </div>
        <div className="m-auto">
          <div className="h-[45px] w-[45px] bg-surface-secondary rounded-full" />
        </div>
      </div>
    ));

  // Render address list or empty state
  const renderAddressList = () => {
    if (addressList.length > 0) {
      return (
        <div className="overflow-y-scroll">
          {addressList.map((item, index) => (
            <div key={index} onClick={() => handleClickAddress(item)}>
              <AddressItem
                activeItem={defaultAddress?.id === item.id}
                addressInfo={item}
                handleEditItem={() => handleClickOpenModal(item)}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p>در حال حاضر آدرسی برای شما ثبت نشده است</p>
        <Button
          handleClick={() => {
            if (token) handleClickOpenModal();
            else {
              removeLastModal();
              push(routeList?.loginRoute);
            }
          }}
          className="my-4 mx-4"
          size="medium"
          buttonType="contained"
          variant="primary"
        >
          افزودن آدرس
        </Button>
      </div>
    );
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
        {addressList.length > 0 && (
          <Button
            handleClick={() => handleClickOpenModal()}
            className="my-4 mx-4"
            size="medium"
            buttonType="contained"
            variant="primary"
          >
            افزودن آدرس
          </Button>
        )}

        {isLoading || isPending || isFetching
          ? renderShimmerEffect()
          : renderAddressList()}
      </MainLayout>
    </FullModalContainer>
  );
};

export default SelectAddress;
