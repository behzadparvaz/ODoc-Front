import dynamic from 'next/dynamic';
import SectionTitle from './SectionTitle.nd';
import { useGetSliderAndCarouselData } from '@api/homePage/homePage.rq';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));
const NextLink = dynamic(() => import('@com/_core/NextLink'));
const NextImage = dynamic(() => import('@com/_core/NextImage'));

const CarouselLine = ({ className = '' }) => {
  const { data } = useGetSliderAndCarouselData();
  return (
    <div className={`${className} flex flex-col gap-y-3`}>
      <SectionTitle
        className="px-6"
        title="محصولات پرفروش"
        titleClassName='font-bold'
      />
      <ScrollSlider className="px-6">
        {data?.carousel?.map((item, index) => {
          return (
            <div key={index} className="w-[130px] ml-2 last:ml-0">
              <NextLink href={'/'}>
                <a
                  className={`flex flex-col items-center gap-y-2 bg-grey-100 py-2 rounded-lg`}
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
