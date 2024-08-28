import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderRegisterSteps from '@com/_organisms/OrderRegisterSteps';
import MainLayout from '@com/_template/MainLayout';
import NextImage from '@com/_core/NextImage';

import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';

const HomePage = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const headerChildrenElement = (
    <NextImage src={tapsiLogo} height={20} width={110} />
  );

  return (
    <MainLayout
      headerChildren={headerChildrenElement}
      className="px-6"
      title="ثبت سفارش"
    >
      {profileDataLoding === false ? (
        <OrderRegisterSteps data={data} />
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default HomePage;
