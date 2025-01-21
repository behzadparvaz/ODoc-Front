import { CircleInfromationIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import {
  useGetVendorDetails,
  useGetVendorWorkingHours,
} from '@api/vendor/vendor.rq';

import VendorDetailModal from './VendorDetailModal';

type VendorSectionProps = {
  vendorCode?: string;
};

const VendorSection = ({ vendorCode }: VendorSectionProps) => {
  const { addModal } = useModal();

  const { data: vendorData } = useGetVendorDetails(vendorCode);
  const { data: workingHourData, isLoading: workingHourIsLoading } =
    useGetVendorWorkingHours(vendorCode);

  const handleVendorDetailModal = () => {
    if (vendorData?.isShowName) {
      addModal({
        modal: VendorDetailModal,
        props: {
          data: vendorData,
          workingHourData: workingHourData,
        },
      });
    }
  };

  return (
    <div className="w-full h-[78px] flex items-center justify-between bg-surface-secondary px-4">
      <div className="flex flex-col py-3">
        <span className="text-content-primary text-base font-medium">
          {vendorData?.isShowName
            ? vendorData?.vendorName
            : vendorData?.secondaryName}
        </span>
        {workingHourIsLoading ? (
          <div className="bg-surface-secondary w-20 h-6 rounded-full animate-pulse" />
        ) : (
          <span className="text-content-tertiary text-sm">
            {`ساعت کاری ${parseInt(workingHourData?.fromTimeActive?.split(':')[0], 10)} - ${parseInt(workingHourData?.toTimeActive?.split(':')[0], 10)}`}
          </span>
        )}
      </div>

      <span
        className="w-6 h-6 flex items-center justify-center cursor-pointer"
        onClick={handleVendorDetailModal}
      >
        <CircleInfromationIcon width={20} height={20} fill={colors?.black} />
      </span>
    </div>
  );
};

export default VendorSection;
