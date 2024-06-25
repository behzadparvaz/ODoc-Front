import { useGetUserLocations } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import AddressList from '@com/_organisms/AddressList';
import OrderRegisterConfirmationBottomSheet from '@com/_organisms/OrderRegisterConfirmationBottomSheet';
import ParsiMapBottomSheet from '@com/_organisms/ParsiMapBottomSheet';
import useModal from '@hooks/useModal';
import { setMapStateAction } from '@redux/map/mapActions';
import { RootState } from '@utilities/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  stepOneValue: any;
  userInfo: any;
}

const SelectAddress = ({ stepOneValue, userInfo }: Props) => {
  const { addModal } = useModal();
  const [addressSelected, setAddressSelected] = useState(null);
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
      },
    });
  };
  const { data: addressData, isLoading } = useGetUserLocations();
  const addressItem: any = addressData;
  const [state] = useState({
    referenceNumber: null,
    latitude: null,
    longitude: null,
    vendorSelects: [],
    nationalCode: null,
    customerName: null,
    valueAddress: null,
    titleAddress: null,
    houseNumber: null,
    homeUnit: null,
  });
  useState<boolean>(false);
  const handleRegisterOrder = () => {
    const body = {
      ...state,
      referenceNumber: String(stepOneValue?.referenceNumber),
      nationalCode: stepOneValue?.nationalCode,
      customerName: stepOneValue?.customerName,
      doctorName: stepOneValue?.doctorName,
      comment: stepOneValue?.comment,
      insuranceTypeId: Number(stepOneValue?.insuranceTypeId),
      latitude: addressSelected?.latitude,
      longitude: addressSelected?.longitude,
      valueAddress: addressSelected?.description,
      titleAddress: addressSelected?.name,
      houseNumber: addressSelected?.houseNumber,
      homeUnit: addressSelected?.homeUnit,
    };
    addModal({
      modal: OrderRegisterConfirmationBottomSheet,
      props: {
        data: body,
      },
    });
  };

  return (
    <>
      <div className="w-full">
        {isLoading === false && (
          <>
            {!addressItem?.length ? (
              <div className="text-red text-sm text-red-600 text-center py-8">
                در حال حاضر آدرسی برای شما ثبت نشده است
              </div>
            ) : null}

            {addressItem?.length ? (
              <AddressList
                inOrderPage={true}
                handleClickItem={(addressData) =>
                  setAddressSelected(addressData)
                }
                data={addressItem}
              />
            ) : null}
          </>
        )}
      </div>
      <div className="w-full flex justify-between mt-5">
        <Button
          handleClick={() => handleClickOpenModal()}
          size="large"
          buttonType="contained"
          variant={'primary'}
        >
          افزودن آدرس
        </Button>
        <Button
          size="large"
          disabled={addressSelected ? false : true}
          buttonType="contained"
          handleClick={() => handleRegisterOrder()}
          variant="primary"
        >
          ثبت سفارش
        </Button>
      </div>
    </>
  );
};
export default SelectAddress;
