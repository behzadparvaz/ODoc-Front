import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderRegisterSteps from '@com/_organisms/OrderRegisterSteps';
import { MainLayout } from '@com/Layout';

const HomePage = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();

  return (
    <MainLayout title="ثبت سفارش">
      {profileDataLoding === false ? (
        <OrderRegisterSteps data={data} />
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default HomePage;
