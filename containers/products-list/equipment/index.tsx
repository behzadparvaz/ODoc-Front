import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';
import { SearchIconOutline } from '@com/icons';

const Products = dynamic(() => import('../components/Products'));
const CategoryLevel3 = dynamic(() => import('../components/CategoryLevel3'));

const EquipmentProductsContainer = () => {
  const { query, push } = useRouter();

  return (
    <MainLayout
      headerType="withoutLogo"
      title={query?.categoryNameLevel2}
      hasHeader
      hasBackButton
      backIconHandler={() =>
        push(
          `${routeList?.equipment}?categoryCodeLevel1=11&categoryCodeLevel2=${query?.categoryCodeLevel2}&categoryNameLevel2=${query?.categoryNameLevel2}`,
        )
      }
      hasBasketIcon
      leftSection={
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={() =>
            push({
              pathname: routeList?.search,
              query: { ...query, section: 'equipment' },
            })
          }
        >
          <SearchIconOutline width={24} height={24} fill={'black'} />
        </span>
      }
    >
      <CategoryLevel3
        categoryCodeLevel2={query?.categoryCodeLevel2 as string}
      />

      <Products />
    </MainLayout>
  );
};

export default EquipmentProductsContainer;
