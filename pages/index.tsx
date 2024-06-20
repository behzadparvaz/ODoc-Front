import { useGetProfile } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import MainLayout from '@com/_template/MainLayout';
import { routeList } from '@routes/routeList';
import { isEmpty } from '@utilities/isEmptyObject';
import { RootState } from '@utilities/types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const { push, asPath } = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const handleClickOnRegisterOrderButton = () => {
    isEmpty(user)
      ? push({
          pathname: routeList?.loginRoute,
          query: {
            from_url: routeList?.orderRegisteration,
          },
        })
      : push(routeList?.orderRegisteration);
  };

  return (
    <MainLayout className="flex justify-center items-center" title="ثبت سفارش">
      <div className="">
        <Button
          buttonType="contained"
          variant="primary"
          size="large"
          handleClick={() => {
            handleClickOnRegisterOrderButton();
          }}
        >
          ثبت سفارش
        </Button>
      </div>
    </MainLayout>
  );
};
export default HomePage;
