import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import { MainLayout } from '@com/Layout';

const OtcMedicinePage = () => {
  return (
    <MainLayout hasBottomNavigation>
      <div className="w-full flex flex-col gap-y-4 py-6 px-4">
        <Categories />

        <OtcMedicineCategories />
      </div>
    </MainLayout>
  );
};

export default OtcMedicinePage;
