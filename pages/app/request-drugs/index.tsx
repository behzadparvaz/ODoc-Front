import RequestDrugsContainer from '@com/_organisms/RequestDrugsContainer';
import { MainLayout } from '@com/Layout';

const RequestDrugs = () => {
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      title="ثبت درخواست دارو"
    >
      <div className="px-4 mb-14">
        <RequestDrugsContainer />
      </div>
    </MainLayout>
  );
};
export default RequestDrugs;
