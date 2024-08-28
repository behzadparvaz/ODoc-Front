import { useGetSliderAndCarouselData } from '@api/homePage/homePage.rq';
import NextLink from '@com/_core/NextLink';
import { ArrowLeftIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';
import dynamic from 'next/dynamic';

const MainPageLayout = dynamic(() => import('@com/_template/MainPageLayout'));
const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));
const CarouselLine = dynamic(() => import('@com/_molecules/CarouselLine'));
const OrderTracking = dynamic(() => import('@com/_molecules/OrderTracking'));

const HomePage = () => {
  const { data } = useGetSliderAndCarouselData();

  return (
    <MainPageLayout className="pb-11">
      <div className="px-4">
        <SearchBox className="px-4 mb-4" />
        {/* <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">سفارشهای جاری</h2>
          <a href="#" className="text-blue-500">
            بیشتر
          </a>
        </div>
        <OrderTracking /> */}
        <MainSlider data={data?.banner} />
      </div>
      <div className="flex gap-x-4 px-4 mt-4">
        <NextLink href={routeList?.prescriptionRegisteration}>
          <a
            style={{
              background: 'linear-gradient(90deg, #FFF0E9 0%, #F4F1F0 100%)',
            }}
            className="w-full text-lg py-3 rounded-full"
          >
            <p className="flex justify-between items-center px-4">
              سفارش دارو با نسخه
              <ArrowLeftIconOutline width={24} height={24} fill="#000" />
            </p>
          </a>
        </NextLink>
      </div>
      <div className="mt-8 flex flex-col gap-y-3">
        <SectionTitle
          title="دسته بندی محصولات"
          titleClassName="font-bold px-6"
        />
        <Categories />
      </div>
      <CarouselLine className="mt-8 mb-11" />
    </MainPageLayout>
  );
};
export default HomePage;
