import CarouselLine from '@com/_molecules/CarouselLine';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('@com/_atoms/Button'));
const MainPageLayout = dynamic(() => import('@com/_template/MainPageLayout'));
const MainSlider = dynamic(() => import('@com/_molecules/MainSlider'));
const SearchBox = dynamic(() => import('@com/_atoms/SearchBox'));
const Categories = dynamic(() => import('@com/_molecules/Categories'));
const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));

const HomePage = () => {
  const banners = [
    {
      imageUrl:
        'https://pharmacyforme.org/wp-content/uploads/2023/10/Pharm4Me-Newsletter-Banner-5-1080x608.png',
      imageLink:
        'https://pharmacyforme.org/wp-content/uploads/2023/10/Pharm4Me-Newsletter-Banner-5-1080x608.png',
      id: 1,
      title: 'test',
    },
    {
      imageUrl:
        'https://pharmacyforme.org/wp-content/uploads/2023/10/Pharm4Me-Newsletter-Banner-5-1080x608.png',
      imageLink:
        'https://pharmacyforme.org/wp-content/uploads/2023/10/Pharm4Me-Newsletter-Banner-5-1080x608.png',
      id: 2,
      title: 'test',
    },
  ];

  return (
    <MainPageLayout headerClassName="!justify-center">
      <div className="px-6">
        <SearchBox className=" my-4" />
        <MainSlider data={banners} />
        <div className="flex gap-x-4 mt-4">
          <Button
            size="large"
            variant="primary"
            buttonType="contained"
            handleClick={() => console.log('msd')}
            className="flex-1"
          >
            ثبت نسخه
          </Button>
        </div>
        <div className="mt-8 flex flex-col gap-y-3">
          <SectionTitle
            title="دسته بندی محصولات"
            actionButton={
              <Button
                buttonType="text"
                className="!text-sm !text-grey-600"
                handleClick={() => console.log('into')}
              >
                بیشتر
              </Button>
            }
          />
          <Categories />
        </div>
      </div>
      <CarouselLine className="mt-8 mb-11" />
    </MainPageLayout>
  );
};
export default HomePage;
