import SelectAddress from '@com/_organisms/SelectAddress';
import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import Icon from '@utilities/icon';
import { RootState } from '@utilities/types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const SelectAddressBasket = () => {
  const { addModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div
      onClick={() => {
        addModal({
          modal: SelectAddress,
        });
      }}
      className="flex justify-between gap-6"
    >
      <div className="flex justify-center items-center">
        <Icon
          name="PinCircleFill"
          width={1.5}
          height={1.5}
          fill={colors.grey[600]}
        />
      </div>
      <div className="w-full">
        <h1
          className={classNames(
            'font-bold text-sm',
            !user?.defaultAddress?.name
              ? 'text-content-negative'
              : 'text-content-primary',
          )}
        >
          {user?.defaultAddress?.name
            ? `ارسال به ${user?.defaultAddress?.name}`
            : 'انتخاب آدرس'}
        </h1>
        <p className="font-normal text-xs text-content-tertiary">
          {user?.defaultAddress?.description
            ? user?.defaultAddress?.description
            : 'محدوده آدرس خود را مشخص کنید'}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <ChevronLeftIconOutline
          width={36}
          height={36}
          fill={colors.grey[400]}
        />
      </div>
    </div>
  );
};
export default SelectAddressBasket;
