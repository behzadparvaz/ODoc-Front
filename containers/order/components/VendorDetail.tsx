import { useGetVendorDetails } from '@api/vendor/vendor.rq';
import { ChevronLeftIconOutline, Shop } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import VendorDescriptionBottomsheet from './VendorDescriptionBottomsheet';

type VendorDetailProps = {
  data: any;
};

const VendorDetail = ({ data }: VendorDetailProps) => {
  const { addModal } = useModal();
  const { data: vendorData, isLoading: vendorIsLoading } = useGetVendorDetails(
    data?.vendorCode,
  );

  const handleDescriptionBottomsheet = () => {
    addModal({
      modal: VendorDescriptionBottomsheet,
      props: {
        description: data?.description,
        vendorCode: data?.vendorCode,
      },
    });
  };

  return (
    <div
      className="h-[102px] px-4 py-2 flex items-center gap-2 justify-between border-[0.5px] border-border-inversePrimary rounded-xl cursor-pointer"
      onClick={handleDescriptionBottomsheet}
    >
      <Shop height={24} width={24} fill={colors.gray[600]} />

      <div className="flex flex-col justify-center gap-4 h-full w-full">
        <h3 className="text-base font-medium">
          {vendorData?.isShowName
            ? vendorData?.vendorName
            : vendorData?.secondaryName}
        </h3>
        <span className="text-sm text-content-tertiary line-clamp-2">
          {vendorData?.location?.address}
        </span>
      </div>

      <ChevronLeftIconOutline width={24} height={24} fill={colors.black} />
    </div>
  );
};

export default VendorDetail;
