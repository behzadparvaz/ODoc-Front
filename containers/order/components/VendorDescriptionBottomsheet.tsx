import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import VendorSection from './VendorSection';

type VendorDescriptionBottomsheetProps = {
  description: string;
  vendorCode: string;
};

const VendorDescriptionBottomsheet = ({
  description,
  vendorCode,
}: VendorDescriptionBottomsheetProps) => {
  return (
    <BottomModalContainer height="auto" minHeight={300} className="bg-white">
      <VendorSection vendorCode={vendorCode} />

      <span className="text-sm text-content-secondary">{description}</span>
    </BottomModalContainer>
  );
};

export default VendorDescriptionBottomsheet;
