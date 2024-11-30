import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import { MainLayout } from '@com/Layout';
import { clearDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import dynamic from 'next/dynamic';
const RequestDrugsContent = dynamic(
  () => import('@com/_organisms/RequestDrugsContent'),
);

const OtcMedicineContainer = () => {
  const { push, query } = useRouter();
  const dispatch = useDispatch();

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
      <div>
        <div className="mb-2 min-h-[1px] bg-gray-200 w-full"></div>

        <RequestDrugsContent />
      </div>
      <div className="w-full h-full flex flex-col gap-y-4">
        <OtcMedicineCategories />
      </div>
    </MainLayout>
  );
};

export default OtcMedicineContainer;
