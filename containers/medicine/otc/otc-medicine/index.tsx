import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import { MainLayout } from '@com/Layout';
import { clearDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { routeList } from '@routes/routeList';
import dynamic from 'next/dynamic';
import QuickOrderBanner from './components/quickOrderBanner';

const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));

const OtcMedicineContainer = () => {
  const { push, query } = useRouter();
  const dispatch = useDispatch();
  const conditionShowRequestDrugsContent =
    !Object.keys(query).length ||
    !!(query?.searchText && Object.keys(query)?.length === 1);

  const handleBackButton = () => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      push('/app/otc-medicine');
    } else {
      push('/app');
    }
  };

  useEffect(() => {
    dispatch(clearDrugsStateAction());
  }, [dispatch]);

  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      hasBasketIcon
      title="داروی بدون نسخه"
      backIconHandler={handleBackButton}
    >
      <div className="px-4 py-4">
        <div
          className="cursor-pointer rounded-full"
          onClick={() =>
            push({ pathname: routeList?.search, query: { section: 'otc' } })
          }
        >
          <SearchBox className="px-4" />
        </div>
      </div>

      {conditionShowRequestDrugsContent && <QuickOrderBanner />}

      <div className="w-full h-max flex flex-col gap-y-4">
        <OtcMedicineCategories />
      </div>
    </MainLayout>
  );
};

export default OtcMedicineContainer;
