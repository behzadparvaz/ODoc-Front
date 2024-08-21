import { ClockOutline, CreditCardIconSquare, TruckOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import {
  TenderDrugStoreDataModel,
  TenderShipmentDataModel,
} from '@utilities/interfaces/tender';

type TenderShipmentDetailProps = {
  drugStore: TenderDrugStoreDataModel;
  shipment: TenderShipmentDataModel;
};

const TenderShipmentDetail = ({
  drugStore,
  shipment,
}: TenderShipmentDetailProps) => {
  return (
    <div className="w-full h-max bg-grey-50 border border-grey-800 p-5 rounded-lg flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-md font-bold">{drugStore.name}</span>
        <span className="flex justify-center items-center">
          <CreditCardIconSquare width={20} height={20} stroke={colors.black} />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex justify-center items-center gap-x-2">
          <TruckOutline fill={colors.black} />
          {shipment.type}
        </span>

        <span className="flex items-center text-md">
          {!!shipment.cost && shipment.cost}
          <span className="text-sm text-grey-800">
            {shipment.cost ? 'تومان' : 'رایگان'}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex justify-center items-center gap-x-2">
          <ClockOutline fill={colors.black} />
          ساعت کاری
        </span>

        <span className="flex items-center text-md">{drugStore.type}</span>
      </div>
    </div>
  );
};
export default TenderShipmentDetail;
