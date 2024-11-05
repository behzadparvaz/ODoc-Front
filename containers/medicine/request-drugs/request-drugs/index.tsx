import RequestDrugsContent from '@com/_organisms/RequestDrugsContent';
import { MainLayout } from '@com/Layout';

const RequestDrugsContainer = () => {
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      title="ثبت درخواست دارو"
    >
      <div className="px-4 mb-14">
        <RequestDrugsContent />
      </div>
    </MainLayout>
  );
};
export default RequestDrugsContainer;
