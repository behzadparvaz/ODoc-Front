import NextImage from '@com/_core/NextImage';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';

interface NotOtcProps {
  BasketRefrenceNumber: string;
  BasketIsSpecialPatient: boolean;
}

const PrescriptionItem = ({
  BasketRefrenceNumber,
  BasketIsSpecialPatient,
}: NotOtcProps) => (
  <>
    <div className="w-full h-20 flex items-center justify-start gap-x-4">
      <NextImage
        src={BasketIsSpecialPatient ? specialPatients : prescriptionMedicine}
        alt="rx-image"
        width={72}
        height={72}
      />
      <div className="flex flex-col gap-y-1">
        <span className="text-base font-semibold">
          {BasketIsSpecialPatient ? 'نسخه بیماری خاص' : 'دارو با نسخه'}
        </span>
        <span className="text-base font-semibold">{`کد نسخه ${BasketRefrenceNumber}`}</span>
      </div>
    </div>

    <div className="w-full px-4">
      <div className="w-full h-[1px] bg-grey-200" />
    </div>
  </>
);

export default PrescriptionItem;
