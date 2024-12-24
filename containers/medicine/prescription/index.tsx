import { useRouter } from 'next/router';

import RXRegistration from '@com/_organisms/RXRegistration';
import { MainLayout } from '@com/Layout';
import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';

const PrescriptionContainer = () => {
  const { query } = useRouter();
  const { data, isLoading: profileDataLoading } = useGetProfile();

  const userInfo = data?.queryResult[0];

  const renderContent = () => {
    if (profileDataLoading) {
      return (
        <div className="h-[400px] w-full flex justify-center items-center">
          <Spinner />
        </div>
      );
    }

    return <RXRegistration userInfo={userInfo} />;
  };
  return (
    <MainLayout
      title={query?.type === 'SP' ? 'داروی بیماری خاص' : 'داروی با نسخه'}
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      {renderContent()}
    </MainLayout>
  );
};
export default PrescriptionContainer;
