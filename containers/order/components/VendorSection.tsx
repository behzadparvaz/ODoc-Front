import { CircleInfromationIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { useGetVendorDetails } from '@api/vendor/vendor.rq';

import VendorDetailModal from './VendorDetailModal';

type VendorSectionProps = {
  vendorCode?: string;
};

const VendorSection = ({ vendorCode }: VendorSectionProps) => {
  const { addModal } = useModal();

  const { data: vendorData, isLoading: vendorIsLoading } =
    useGetVendorDetails(vendorCode);

  const handleVendorDetailModal = () => {
    addModal({
      modal: VendorDetailModal,
      props: {
        data: vendorData,
      },
    });
  };

  return (
    <div className="w-full h-[78px] flex items-center justify-between bg-surface-secondary px-4">
      <div className="flex flex-col py-3">
        <span className="text-content-primary text-base font-medium">
          {vendorData?.vendorName}
        </span>
        <span className="text-content-tertiary text-sm">
          {`ساعت کاری ${parseInt(vendorData?.fromTimeActive.split(':')[0], 10)} - ${parseInt(vendorData?.toTimeActive.split(':')[0], 10)}`}
        </span>
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
