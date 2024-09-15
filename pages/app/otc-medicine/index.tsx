import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import { MainLayout } from '@com/Layout';

const OtcMedicinePage = () => {
  return (
    <MainLayout hasBottomNavigation>
      <div className="w-full flex flex-col gap-y-4 pb-6 px-2">
        <Categories />
        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
    </MainLayout>
  );
};

export default OtcMedicinePage;
