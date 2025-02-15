import {
  useDeleteProductBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import NextImage from '@com/_core/NextImage';
import { colors } from '@configs/Theme';
import specialPatients from '@public/images/newTiles/specialPatients.webp';
import prescriptionMedicine from '@public/images/newTiles/prescriptionMedicine.webp';
import Icon from '@utilities/icon';

interface NotOtcProps {
  refrenceNumber: string;
  isSpecialPatient: boolean;
  hasDivider?: boolean;
}

const PrescriptionItem = ({
  refrenceNumber,
  isSpecialPatient,
  hasDivider,
}: NotOtcProps) => {
  const { refetch: refetchGetBasket } = useGetCurrentBasket({
    refetchOnMount: 'false',
  });
  const { mutate: popProductOfCart } = useDeleteProductBasket({
    onSuccess: () => {
      refetchGetBasket();
    },
  });

  const handleDeleteItem = () => {
    popProductOfCart({ type: 'RX', refrenceNumber: refrenceNumber });
  };

  return (
    <>
      <div className="w-full h-20 flex items-center justify-start gap-x-4">
        <NextImage
          src={isSpecialPatient ? specialPatients : prescriptionMedicine}
          alt="rx-image"
          width={72}
          height={72}
          style={{ width: 72, height: 72, objectFit: 'contain' }}
        />
        <div className="w-full flex flex-col gap-y-1">
          <span className="text-base font-semibold">
            {isSpecialPatient ? 'نسخه داروخانه های ۱۳ آبان' : 'دارو با نسخه'}
          </span>
          <span className="text-base font-semibold">{`کد نسخه ${refrenceNumber}`}</span>
        </div>

        <div onClick={handleDeleteItem} className="cursor-pointer">
          <Icon name="Trash" width={1.25} height={1.25} fill={colors?.black} />
        </div>
      </div>

      {hasDivider && <div className="w-full h-[1px] bg-grey-200" />}
    </>
  );
};

export default PrescriptionItem;
