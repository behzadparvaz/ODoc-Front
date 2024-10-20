import NextLink from '@com/_core/NextLink';
import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
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
        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
      <div className="px-4">
        <NextLink href={routeList?.QuickOrder}>
          <a className="px-4 flex bg-gray-50 justify-between items-center rounded-xl py-6 text-lg mb-8">
            <ListWithTimer width={20} height={20} fill={colors?.black} />
            {quickOrderText?.quickOrderHelp}
            <ChevronLeftIconOutline
              width={20}
              height={20}
              fill={colors?.gray[400]}
            />
          </a>
        </NextLink>
      </div>
    </MainPageLayout>
  );
};

export default OtcMedicinePage;
