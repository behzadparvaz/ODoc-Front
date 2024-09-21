import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@com/_atoms/Button';
import { useGetUserLocations } from '@api/user/user.rq';
import SelectAddress from '@com/_organisms/SelectAddress';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { RootState } from '@utilities/types';
import { setUserAction } from '@redux/user/userActions';
import { homePageText } from '@com/texts/homePage';

type AddressProps = {
  buttonTitle?: string;
};
const Address = ({ buttonTitle }: AddressProps) => {
  const { addModal } = useModal();
  const { data: addressDate } = useGetUserLocations();
  const { user } = useSelector((state: RootState) => state?.user);
  const { addressSelected } = useSelectAddressByCurrentLocation(addressDate);
  const dispatch = useDispatch();

  const defaultAddress: any = user?.defaultAddress ?? null;

  useEffect(() => {
    if (!defaultAddress) {
      if (addressSelected) {
        dispatch(
          setUserAction({
            defaultAddress: addressSelected,
          }),
        );
      } else {
        dispatch(
          setUserAction({
            defaultAddress: null,
          }),
        );
      }
    }
  }, [dispatch, addressSelected]);

  const onClickOpenModal = () => {
    addModal({
      modal: SelectAddress,
    });
  };

  return (
    <div className="flex justify-between py-3 px-4 my-4">
      <div className="flex flex-col gap-y-2">
        <h3 className="font-medium text-right">ارسال به</h3>
        <div className="text-grey-500 font-normal py-2">
          {!!defaultAddress
            ? defaultAddress?.description
            : homePageText?.selectAddress}
        </div>
      </div>

      <Button
        buttonType={'contained'}
        className={'bg-grey-100 !rounded-full !h-11 mt-3'}
        handleClick={onClickOpenModal}
      >
        {buttonTitle ? buttonTitle : `انتخاب یا تغییر آدرس`}{' '}
      </Button>
    </div>
  );
};

export default Address;
