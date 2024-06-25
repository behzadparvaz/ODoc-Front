import { useGetProfile } from '@api/user/user.rq';
import OrderRegisterSteps from '@com/_organisms/OrderRegisterSteps';
import MainLayout from '@com/_template/MainLayout';

const HomePage = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();

  // const handleClickOnRegisterOrderButton = () => {
  //   isEmpty(user)
  //     ? push({
  //         pathname: routeList?.loginRoute,
  //         query: {
  //           from_url: routeList?.orderRegisteration,
  //         },
  //       })
  //     : push(routeList?.orderRegisteration);
  // };

  return (
    <MainLayout className="px-6" title="ثبت سفارش">
      {profileDataLoding === false && <OrderRegisterSteps data={data} />}
    </MainLayout>
  );
};
export default HomePage;
