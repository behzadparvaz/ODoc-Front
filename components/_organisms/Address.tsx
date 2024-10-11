import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetUserLocations } from '@api/user/user.rq';
import SelectAddress from '@com/_organisms/SelectAddress';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { RootState } from '@utilities/types';
import { setUserAction } from '@redux/user/userActions';
import { homePageText } from '@com/texts/homePage';
import { Button } from '@com/_atoms/NewButton';

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
    <div className="flex flex-col py-3 px- gap-2 sm:flex-row sm:justify-between sm:items-end">
      <div className="w-full flex flex-col gap-y-2 sm:w-4/6">
        <h3 className="font-medium text-right">ارسال به</h3>
        <div className="text-grey-500 font-normal truncate">
          {!!defaultAddress
            ? defaultAddress?.description
            : homePageText?.selectAddress}
        </div>
      </div>

      <Button
        className={'w-full max-w-[200px] self-end'}
        variant="secondary"
        size="large"
        onClick={onClickOpenModal}
      >
        {buttonTitle ? buttonTitle : `انتخاب آدرس`}
      </Button>
    </div>
  );
};

export default Address;
