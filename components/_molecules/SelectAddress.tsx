import Button from '@com/_atoms/Button';
import AddressList from '@com/_organisms/AddressList';
import ParsiMapBottomSheet from '@com/_organisms/ParsiMapBottomSheet';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { RootState } from '@utilities/types';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@com/_atoms/Box';
import { useGetUserLocations } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';

interface Props {
  setAddressSelected: (data: any) => void;
}

const SelectAddress = ({ setAddressSelected }: Props) => {
  const { addModal } = useModal();
  const { defaultViewPort } = useSelector((state: RootState) => state.mapInfo);
  const dispatch = useDispatch();
  const { data: addressData, isLoading } = useGetUserLocations();

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

  const addressItem: any = addressData;

  return (
    <Box>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">انتخاب آدرس</span>
        <Button
          handleClick={() => handleClickOpenModal()}
          size="small"
          className="text-xs"
          buttonType="contained"
          variant={'primary'}
        >
          افزودن
        </Button>
      </div>

      {isLoading ? (
        <Spinner className="h-28 -my-0.5 w-full flex justify-center items-center" />
      ) : (
        <>
          {addressItem?.length ? (
            <AddressList
              inOrderPage={true}
              handleClickItem={(addressData) => setAddressSelected(addressData)}
              data={addressItem}
            />
          ) : (
            <div className="text-red text-sm text-red-600 text-center py-11">
              در حال حاضر آدرسی برای شما ثبت نشده است
            </div>
          )}
        </>
      )}
    </Box>
  );
};
export default SelectAddress;
