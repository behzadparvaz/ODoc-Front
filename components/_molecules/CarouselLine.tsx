import dynamic from 'next/dynamic';
import secondSlidePNG from '@static/images/staticImages/sample-carousel.png';
import SectionTitle from './SectionTitle.nd';
import { useGetSliderAndCarouselData } from '@api/homePage/homePage.rq';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const NextLink = dynamic(() => import('@com/_core/NextLink'));
const NextImage = dynamic(() => import('@com/_core/NextImage'));
const Button = dynamic(() => import('@com/_atoms/Button'));

const CarouselLine = ({ className = '' }) => {
  const { data } = useGetSliderAndCarouselData();

  // const carouselMockData = [
  //   {
  //     id: 0,
  //     name: ' داروی صد درد',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 1,
  //     name: ' داروی صد درد',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 2,
  //     name: 'داروی معده',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 3,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 4,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 5,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 6,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 7,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 8,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  //   {
  //     id: 9,
  //     name: 'داروی انتی بیوتیک',
  //     imageUrl: secondSlidePNG,
  //   },
  // ];
  return (
    <div className={`${className} flex flex-col gap-y-3`}>
      <SectionTitle
        className="px-6"
        title="لورم ایپسوم"
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
      <ScrollSlider className="px-6">
        {data?.carousel?.map((item, index) => {
          return (
            <div key={index} className="w-[130px] ml-2 last:ml-0">
              <NextLink href={'/'}>
                <a
                  className={`flex flex-col items-center gap-y-2 bg-grey-50 py-2 rounded-lg`}
                >
                  <NextImage
                    width={70}
                    height={70}
                    src={item}
                    alt={'item?.name'}
                  />
                  {/* <p className="text-sm text-grey-600">{item?.name}</p> */}
                </a>
              </NextLink>
            </div>
          );
        })}
      </ScrollSlider>
    </div>
  );
};
export default CarouselLine;
