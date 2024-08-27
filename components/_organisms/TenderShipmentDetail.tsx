import { BikerOutlineIcon, ClockOutlineIcon, StarFillIcon } from '@com/icons';
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
    <div className="w-full h-[120px] bg-white p-4 py-2 rounded-lg flex flex-col gap-y-3 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium leading-7">
          {drugStore.name}
        </span>
        <span className="w-16 h-6 rounded-full flex justify-center items-center bg-orange-50 text-sm font-normal text-orange-400 leading-6">
          {drugStore.rate}
          <StarFillIcon />
        </span>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <span className="flex justify-center items-center gap-x-2 text-grey-400 text-sm">
            <BikerOutlineIcon fill={colors.grey[400]} />
            {shipment.type}
          </span>

          <span className="flex items-center text-sm text-grey-500">
            {!!shipment.cost && shipment.cost}
            <span className="text-sm text-grey-500">
              {shipment.cost ? 'تومان' : 'رایگان'}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between  text-sm text-grey-500">
          <span className="flex justify-center items-center gap-x-2">
            <ClockOutlineIcon height={18} width={18} fill={colors.grey[400]} />
            ساعت کاری
          </span>

          <span className="flex items-center text-md">{drugStore.type}</span>
        </div>
      </div>
    </div>
  );
};
export default TenderShipmentDetail;
