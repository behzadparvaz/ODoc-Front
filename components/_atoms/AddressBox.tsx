import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectAddress from '@com/_organisms/SelectAddress';
import { homePageText } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { setUserAction } from '@redux/user/userActions';
import Icon from '@utilities/icon';
import { RootState } from '@utilities/types';

interface Address {
  name: string;
  description: string;
}

interface Props {
  data: any; // Consider replacing 'any' with a more specific type
  className?: string;
}

const AddressBox = ({ data, className = '' }: Props) => {
  const { addressSelected } = useSelectAddressByCurrentLocation(data);
  const { addModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress: Address | null = user?.defaultAddress || null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (addressSelected) {
      dispatch(setUserAction({ defaultAddress: addressSelected }));
    }
  }, [dispatch, addressSelected, defaultAddress]);

  const handleModalOpen = () => {
    addModal({ modal: SelectAddress });
  };

  return (
    <div
      onClick={handleModalOpen}
      className="w-full flex justify-between items-center cursor-pointer"
    >
      <div
        className={`w-full pl-2 text-content-primary font-bold text-xs truncate ${className}`}
      >
        {defaultAddress ? (
          <div className="block">
            <span className="block text-sm truncate">
              ارسال به {defaultAddress.name}
            </span>
            <div className="flex justify-start items-center">
              <span className="text-xs text-content-tertiary truncate">
                {defaultAddress.description}
              </span>
              <div className="w-[24px]">
                <Icon
                  name="ChevronDown"
                  width={1.5}
                  height={1.5}
                  stroke={colors.grey[500]}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="text-sm flex justify-start items-center text-content-negative">
              {homePageText.selectAddress}
              <Icon
                name="ChevronLeft"
                width={1}
                height={1}
                fill={colors.red[400]}
              />
            </div>
            <span className="w-full text-xs text-content-tertiary truncate">
              محدوده آدرس خود را مشخص کنید
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBox;
