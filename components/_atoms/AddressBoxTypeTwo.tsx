import { PinLocation } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';
import { RootState } from '@utilities/types';
import { useSelector } from 'react-redux';
import Button from './Button';
import useModal from '@hooks/useModal';
import SelectAddress from '@com/_organisms/SelectAddress';

interface Props {
  className?: string;
  justForShow?: boolean;
  addressInfo?: any;
}
const AddressBoxTypeTwo = ({
  className = '',
  justForShow = false,
  addressInfo,
}: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { addModal } = useModal();
  return (
    <div className={`${className} flex items-center justify-between`}>
      <div className="flex items-center gap-x-5">
        <PinLocation width={24} height={24} fill={colors?.gray[600]} />
        <div>
          <p className="text-xs text-gray-500 mb-3">{generalTexts?.sendTo}</p>
          <p className="text-xs font-bold black">
            {addressInfo
              ? addressInfo?.description
              : defaultAddress?.description}
          </p>
        </div>
      </div>

      {!justForShow && (
        <Button
          handleClick={() => {
            addModal({
              modal: SelectAddress,
            });
          }}
          buttonType="contained"
          className="shrink-0 !h-10 bg-gray-100 !px-3 !text-xs"
          size="large"
        >
          <p>تغییر آدرس</p>
        </Button>
      )}
    </div>
  );
};
export default AddressBoxTypeTwo;
