import Categories from '@com/_molecules/Categories';
import OtcMedicineCategories from '@com/_molecules/OtcMedicineCategories';
import MainPageLayout from '@com/_template/MainPageLayout';

const OtcMedicinePage = () => {
  return (
    <MainPageLayout
      hasBottomNavigation={false}
      hasFooter={false}
      hasAddress={false}
      title="داروی بدون نسخه"
    >
      <div className="w-full flex flex-col gap-y-4 pt-4 pb-10 px-2">
        <Categories />

        <div className="px-2">
          <OtcMedicineCategories />
        </div>
      </div>
    </MainPageLayout>
  );
};

export default OtcMedicinePage;
