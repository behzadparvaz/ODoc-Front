import OrderInfoForm from '@com/_molecules/OrderInfoForm';
import {
  useAddProductToBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';
import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import { MainLayout } from '@com/Layout';

const RXRegistration = () => {
  const { data, isLoading: profileDataLoading } = useGetProfile();
  const { query } = useRouter();

  return (
    <MainLayout
      title={query?.type === 'SP' ? 'داروی بیماری خاص' : 'داروی با نسخه'}
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      <div className="p-4 mb-14">
        {profileDataLoading === false ? (
          <OrderRegisterSteps data={data} />
        ) : (
          <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
        )}
      </div>
    </MainLayout>
  );
};

export default RXRegistration;

const OrderRegisterSteps = ({ data, className = '' }) => {
  const userInfo = data?.queryResult[0];
  const router = useRouter();

  const { refetch: refetchGetBasket } = useGetCurrentBasket();
  const { mutate: addToCart, isPending: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        refetchGetBasket();
        router.push(routeList.basket);
      },
    });

  return (
    <div className={`${className}`}>
      {isAddingToCart ? (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      ) : (
        <OrderInfoForm
          submitForm={(value) => {
            addToCart({
              orderType: 'RX',
              ...value,
            });
          }}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};
