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
}
const AddressBoxTypeTwo = ({ className = '', justForShow = false }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const { addModal } = useModal();

  return (
    <div className={`${className} flex gap-x-5 items-center`}>
      <PinLocation width={24} height={24} fill={colors?.gray[600]} />
      <div>
        <p className="text-sm text-gray-500">{generalTexts?.sendTo}</p>
        <p className="text-sm font-bold black">{defaultAddress?.description}</p>
      </div>

      {justForShow && (
        <Button
          handleClick={() => {
            addModal({
              modal: SelectAddress,
            });
          }}
          buttonType="contained"
          className="shrink-0 !h-10 bg-gray-100 !px-3 !text-sm"
          size="large"
        >
          <p>تغییر آدرس</p>
        </Button>
      )}
    </div>
  );
};
export default AddressBoxTypeTwo;
