import { useRouter } from 'next/router';

import RXRegistration from '@com/_organisms/RXRegistration';
import { MainLayout } from '@com/Layout';

const PrescriptionContainer = () => {
  const { query } = useRouter();
  return (
    <MainLayout
      title={query?.type === 'SP' ? 'داروی بیماری خاص' : 'داروی با نسخه'}
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      <RXRegistration />
    </MainLayout>
  );
};
export default PrescriptionContainer;
