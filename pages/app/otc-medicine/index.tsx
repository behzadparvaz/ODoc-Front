import NextLink from '@com/_core/NextLink';
import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import RequestDrugsContainer from '@com/_organisms/RequestDrugsContainer';
import MainPageLayout from '@com/_template/MainPageLayout';
import { ChevronLeftIconOutline, ListWithTimer } from '@com/icons';
import { quickOrderText } from '@com/texts/quickOrderText';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const OtcMedicinePage = () => {
  const { push, query } = useRouter();

  const handleBackButton = () => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      push('/app/otc-medicine');
    } else {
      push('/app');
    }
  };

  return (
    <MainPageLayout
      hasBottomNavigation={false}
      hasFooter={false}
      hasAddress={false}
      title="داروی بدون نسخه"
      backButtonAction={handleBackButton}
    >
      <div className="w-full flex flex-col gap-y-4 pt-4 mb-5 px-2">
        <Categories />

        {Object.keys(query).length < 1 ? (
          <div className="px-4">
            <h1 className="text-lg font-bold my-3">ثبت درخواست دارو</h1>
            <RequestDrugsContainer />
          </div>
        ) : null}

        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
    </MainPageLayout>
  );
};

export default OtcMedicinePage;
