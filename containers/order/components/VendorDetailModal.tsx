import NextImage from '@com/_core/NextImage';
import { MainLayout } from '@com/Layout';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';

type VendorDetailModalProps = {
  data: any;
};

const VendorDetailModal = ({ data }: VendorDetailModalProps) => {
  return (
    <FullModalContainer animation={FullModalAnimations.none}>
      <MainLayout>
        <div className="aspect-w-23 aspect-h-10">
          <NextImage
            alt="vendor-page"
            src={'/static/images/staticImages/vendor-page.png'}
            fill
          />
        </div>

        <div className="w-full flex justify-end px-[20px] -translate-y-[46px]">
          <div className="w-[64px] h-[64px] flex items-center justify-center  overflow-hidden rounded-lg">
            <NextImage alt="vendor-logo" src={''} width={64} height={64} />
          </div>
        </div>

        <div className="w-full px-[20px] flex flex-col -translate-y-[46px]">
          <span className="text-2xl font-semibold">{data?.vendorName}</span>

          <div className="w-full h-[68px] flex flex-col"></div>
        </div>
      </MainLayout>
    </FullModalContainer>
  );
};

export default VendorDetailModal;
