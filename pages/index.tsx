import Image from 'next/image';

import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderRegisterSteps from '@com/_organisms/OrderRegisterSteps';
import MainLayout from '@com/_template/MainLayout';

const HomePage = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const headerChildrenElement = (
    <Image
      alt="logo"
      src="/static/images/staticImages/logo.svg"
      width={150}
      height={30}
    />
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
