import SelectAddress from '@com/_organisms/SelectAddress';
import { ArrowDownIconOutLine } from '@com/icons';
import { homePageText } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { setUserAction } from '@redux/user/userActions';
import { RootState } from '@utilities/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  data: any;
  className?: string;
}
const AddressBox = ({ data, className = '' }: Props) => {
  const { addressSelected } = useSelectAddressByCurrentLocation(data);
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const dispatch = useDispatch();

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
        addModal({
          modal: SelectAddress,
        });
      }
    }
  }, [dispatch, addressSelected]);
  const { addModal } = useModal();
  return (
    <div
      onClick={() => {
        addModal({
          modal: SelectAddress,
        });
      }}
      className="w-full flex justify-between items-center"
    >
      <div
        className={`w-[calc(100%-24px)] text-grey-800 font-bold text-xs truncate ${className}`}
      >
        {defaultAddress
          ? defaultAddress?.description
          : homePageText?.selectAddress}
      </div>
      <div className="w-[24px]">
        <ArrowDownIconOutLine
          width={24}
          height={24}
          stroke={colors?.grey[400]}
        />
      </div>
    </div>
  );
};
export default AddressBox;
