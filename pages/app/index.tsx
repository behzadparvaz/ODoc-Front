import { useGetProfile } from '@api/user/user.rq';
import Spinner from '@com/_atoms/Spinner';
import OrderRegisterSteps from '@com/_organisms/OrderRegisterSteps';
import MainLayout from '@com/_template/MainLayout';
import NextImage from '@com/_core/NextImage';

import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';
import ProductCard from '@com/_molecules/productCard';

const HomePage = () => {
  const { data, isLoading: profileDataLoding } = useGetProfile();
  const headerChildrenElement = (
    <NextImage src={tapsiLogo} height={20} width={85} />
  );
  const product = {
    name: 'ژلوفن',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
  };

  return (
    <MainLayout
      headerChildren={headerChildrenElement}
      className="px-6"
      title="ثبت سفارش"
    >
      <ProductCard product={product} />
      {profileDataLoding === false ? (
        <OrderRegisterSteps data={data} />
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center" />
      )}
    </MainLayout>
  );
};
export default HomePage;
