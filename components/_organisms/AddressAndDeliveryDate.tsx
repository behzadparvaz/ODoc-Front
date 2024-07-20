import SelectDeliveryDate from '@com/_molecules/SelectDeliveryDate';
import Button from '@com/_atoms/Button';
import OrderRegisterConfirmationBottomSheet from '@com/_organisms/OrderRegisterConfirmationBottomSheet';
import { useState } from 'react';
import SelectAddress from '@com/_molecules/SelectAddress';
import useModal from '@hooks/useModal';

const AddressAndDeliveryDate = ({ stepOneValue }) => {
  const { addModal } = useModal();
  const [addressSelected, setAddressSelected] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleRegisterOrder = () => {
    const body = {
      vendorSelects: stepOneValue?.vendorSelects,
      referenceNumber: String(stepOneValue?.referenceNumber),
      nationalCode: stepOneValue?.nationalCode,
      customerName: stepOneValue?.customerName,
      doctorName: stepOneValue?.doctorName,
      comment: stepOneValue?.comment,
      isSpecialPatient: stepOneValue?.isSpecialPatient,
      insuranceTypeId: Number(stepOneValue?.insuranceTypeId),
      latitude: addressSelected?.latitude,
      longitude: addressSelected?.longitude,
      valueAddress: addressSelected?.description,
      titleAddress: addressSelected?.name,
      houseNumber: addressSelected?.houseNumber,
      homeUnit: addressSelected?.homeUnit,
      deliveryDate: deliveryDate
    };
    addModal({
      modal: OrderRegisterConfirmationBottomSheet,
      props: {
        data: body
      }
    });
  };

  return <>
    <div className="w-full">
      <SelectAddress setAddressSelected={setAddressSelected}/>
      <SelectDeliveryDate deliveryDate={deliveryDate} setDeliveryDate={setDeliveryDate}/>
    </div>
    <div className="w-full flex justify-end mt-5">
      <Button
        size="large"
        disabled={!addressSelected || !deliveryDate}
        buttonType="contained"
        handleClick={() => handleRegisterOrder()}
        variant="primary"
      >
        ثبت سفارش
      </Button>
    </div>
  </>;
};

export default AddressAndDeliveryDate;
