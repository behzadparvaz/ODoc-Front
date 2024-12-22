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

import ParsiMapBottomSheet from './ParsiMapBottomSheet';
import { Location } from '@utilities/interfaces/location';
import { init } from 'next/dist/compiled/webpack/webpack';

const SelectAddress = () => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  const { push } = useRouter();

  const shimmerCount = [...Array(5).keys()];
  const { data, isLoading, isPending, isFetching } = useGetUserLocations();
  const addressList: any = data;
  const { removeLastModal, addModal } = useModal();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);

  const handleClickOpenModal = (item?: Location) => {
    dispatch(
      setMapStateAction({
        viewport: !!item
          ? {
              latitude: item?.latitude,
              longitude: item?.longitude,
              id: item?.id,
              name: item?.name,
            }
          : defaultViewPort,
        mapIsTouched: !!item,
      }),
    );
    addModal({
      modal: ParsiMapBottomSheet,
      props: {
        latitude: item?.latitude,
        longitude: item?.longitude,
        addressId: 0,
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
        {addressList?.length ? (
          <Button
            handleClick={() => handleClickOpenModal()}
            className={`my-4 mx-4`}
            size="medium"
            buttonType="contained"
            variant={'primary'}
          >
            افزودن آدرس
          </Button>
        ) : null}
        {(isLoading || isPending || isFetching) &&
          shimmerCount.map((_, idx) => (
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
          ))}

        {!isLoading && !isFetching && !isPending && addressList?.length > 0 && (
          <div className="overflow-y-scroll">
            {addressList?.map((item, index) => {
              const activeItem = defaultAddress?.id === item?.id;
              return (
                <div key={index} onClick={() => handleClickAddress(item)}>
                  <AddressItem
                    activeItem={activeItem}
                    addressInfo={item}
                    handleEditItem={() => handleClickOpenModal(item)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !isFetching && !isPending && !addressList?.length && (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <p> در حال حاضر آدرسی برای شما ثبت نشده است</p>
            <Button
              handleClick={() => {
                if (token) handleClickOpenModal();
                else {
                  removeLastModal();
                  push(routeList?.loginRoute);
                }
              }}
              className={`my-4 mx-4`}
              size="medium"
              buttonType="contained"
              variant={'primary'}
            >
              افزودن آدرس
            </Button>
          </div>
        )}
      </MainLayout>
    </FullModalContainer>
  );
};

export default SelectAddress;
