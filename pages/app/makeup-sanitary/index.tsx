import { useGetBanners, useGetCarousels } from '@api/promotion/promotion.rq';
import SearchBox from '@com/_atoms/SearchBox';
import CarouselLine from '@com/_molecules/CarouselLine';
import MainSlider from '@com/_molecules/MainSlider';
import MainPageLayout from '@com/_template/MainPageLayout';
import { useRouter } from 'next/router';

const MakeupSanitary = () => {
  const { push, query } = useRouter();
  const { data: bannerData } = useGetBanners();

  const handleBackButton = () => {
    if (query?.categoryNameLevel1 && query?.categoryCodeLevel1) {
      push('/app/otc-medicine');
    } else {
      push('/app');
    }
  };
  const { data: carouselsData, isLoading } = useGetCarousels();

  const getCarouselDataData = (position: number) => {
    const carouselData = carouselsData?.queryResult?.filter(
      (item) => item?.sectionPosition === position,
    )?.[0];
    return carouselData;
  };
  return (
    <MainPageLayout
      hasBottomNavigation={false}
      hasFooter={true}
      hasAddress={false}
      title="آرایشی بهداشتی"
      hasSearchIcon={false}
      backButtonAction={handleBackButton}
    >
      <div className="px-4">
        <SearchBox className="px-4 my-2" />
      </div>

      {bannerData?.queryResult && (
        <MainSlider
          className="py-2 px-4"
          data={[bannerData?.queryResult?.[0], bannerData?.queryResult?.[1]]}
        />
      )}

      <CarouselLine
        data={getCarouselDataData(1)}
        className="my-4 border-b-8 border-grey-50 pb-3"
      />
      <CarouselLine data={getCarouselDataData(2)} className="my-4" />
    </MainPageLayout>
  );
};

export default MakeupSanitary;
