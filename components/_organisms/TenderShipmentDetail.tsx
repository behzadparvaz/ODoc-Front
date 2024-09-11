import { BikerOutlineIcon, ClockIconOutline, StarIconFill } from '@com/icons';
import { colors } from '@configs/Theme';

import { TenderItemsDeliveryDataModel } from '@utilities/interfaces/tender';
import { VendorDetailDataModel } from '@utilities/interfaces/vendor';

type TenderShipmentDetailProps = {
  vendor: VendorDetailDataModel;
  delivery: TenderItemsDeliveryDataModel;
};

const TenderShipmentDetail = ({
  vendor,
  delivery,
}: TenderShipmentDetailProps) => {
  return (
    <div className="w-full h-[120px] bg-white p-4 py-2 rounded-lg flex flex-col gap-y-3 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium leading-7">
          {vendor.vendorName}
        </span>
        <span className="w-16 h-6 rounded-full flex justify-center items-center bg-orange-50 text-sm font-normal text-orange-400 leading-6 gap-x-2">
          {/* {'vendor?.rate'} */}
          {4}
          <StarIconFill height={13} width={14} fill={colors.orange[400]} />
        </span>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <span className="flex justify-center items-center gap-x-2 text-grey-400 text-sm">
            <BikerOutlineIcon fill={colors.grey[400]} />
            {'delivery.type'}
          </span>

          <span className="flex items-center text-sm text-grey-500">
            {!!delivery?.deliveryPrice && delivery?.deliveryPrice}
            <span className="text-sm text-grey-500">
              {delivery?.deliveryPrice ? 'تومان' : 'رایگان'}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between  text-sm text-grey-500">
          <span className="flex justify-center items-center gap-x-2">
            <ClockIconOutline height={18} width={18} fill={colors.grey[400]} />
            ساعت کاری
          </span>

          <span className="flex items-center text-md">
            {vendor?.pharmacyType?.name}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TenderShipmentDetail;
