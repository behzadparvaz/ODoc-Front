import SelectAddress from '@com/_organisms/SelectAddress';
import { ArrowDownIconOutLine } from '@com/icons';
import { homePageText } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import { setUserAction } from '@redux/user/userActions';
import Icon from '@utilities/icon';
import { RootState } from '@utilities/types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  data: any;
  className?: string;
}
const AddressBox = ({ data, className = '' }: Props) => {
  const { addressSelected, loading } = useSelectAddressByCurrentLocation(data);
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserAction({
        defaultAddress: null,
      }),
    );
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
  const { addModal } = useModal();
  console.log(defaultAddress);
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
        {defaultAddress ? (
          <div className="block">
            <span className="block text-sm truncate">
              ارسال به {defaultAddress?.name}
            </span>
            <div className="flex justify-start items-center">
              <span className="text-xs text-grey-500 truncate">
                {defaultAddress?.description}
              </span>
              <div className="w-[24px]">
                <Icon
                  name="ChevronDown"
                  width={1.5}
                  height={1.5}
                  stroke={colors?.grey[500]}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm flex justify-start items-center text-red-400">
              {homePageText?.selectAddress}

              <Icon
                name="ChevronLeft"
                width={1}
                height={1}
                fill={colors?.red[400]}
              />
            </span>
            <span className="text-xs flex text-grey-500">
              محدوده آدرس خود را مشخص کنید
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddressBox;
