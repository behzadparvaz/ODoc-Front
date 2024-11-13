import SelectAddress from '@com/_organisms/SelectAddress';
import { ChevronLeftIconOutline, LocationIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { RootState } from '@utilities/types';
import { useSelector } from 'react-redux';

const SelectAddressAction = () => {
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
      <div>
        <LocationIconOutline width={36} height={36} fill={colors.grey[600]} />
      </div>
      <div className="w-full">
        <h1 className="font-bold">آدرس</h1>
        <p className="font-normal text-grey-500">
          {user?.defaultAddress?.description
            ? user?.defaultAddress?.description
            : 'آدرس خود را انتخاب کنید'}
        </p>
      </div>
      <div>
        <ChevronLeftIconOutline
          width={36}
          height={36}
          fill={colors.grey[400]}
        />
      </div>
    </div>
  );
};
export default SelectAddressAction;
