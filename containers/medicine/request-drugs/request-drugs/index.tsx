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
      <RequestDrugsContent />
    </MainLayout>
  );
};
export default RequestDrugsContainer;
