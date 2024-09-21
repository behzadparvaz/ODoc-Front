import { useGetCategoryDescription } from '@api/category/categoryApis.rq';
import Button from '@com/_atoms/Button';
import SearchBox from '@com/_atoms/SearchBox';
import DrugShapesBox from '@com/_molecules/DrugShapesBox';
import ProductDetail from '@com/_molecules/ProductDetail';
import ProductSlider from '@com/_molecules/ProductSlider';
import SectionTitle from '@com/_molecules/SectionTitle.nd';
import MainPageLayout from '@com/_template/MainPageLayout';
import { ArrowRightIconOutline } from '@com/icons';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { useRouter } from 'next/router';

const Product = () => {
  const { back, query } = useRouter();

  const { data, isLoading } = useGetCategoryDescription(
    String(query?.categoryCode),
  );

  const productDetail: any = data?.queryResult?.[0];
  const productSliderData = productDetail?.imageLinks;

  return (
    <MainPageLayout
      hasFooter={false}
      hasAddress={false}
      hasSearchIcon={false}
      className={`${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} bg-grey-50`}
    >
      <div
        className={`flex px-4 z-10 items-center py-3 bg-white shadow-md fixed inset-x-0 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
      >
        <Button handleClick={back}>
          <ArrowRightIconOutline fill="#000" width={24} height={24} />
        </Button>
        <SearchBox />
      </div>
      <div className="w-full pt-[92px] pb-9 min-h-[600px] h-full">
        {isLoading === false ? (
          <div className="px-4">
            <div className="flex flex-col gap-y-2 rounded-xl bg-white p-4">
              <SectionTitle
                title={`${query?.categoryName}`}
                tag="h1"
                className="text-lg font-semibold"
              />

              <ProductSlider
                data={productSliderData}
                className="px-4 bg-white rounded-2xl py-6"
              />
            </div>
            <DrugShapesBox />

            <ProductDetail
              data={productDetail}
              className="px-4 mt-4 bg-white rounded-2xl py-6"
            />
          </div>
        ) : null}
      </div>
    </MainPageLayout>
  );
};
export default Product;
