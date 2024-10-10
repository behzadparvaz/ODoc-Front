import dynamic from 'next/dynamic';
import SectionTitle from './SectionTitle.nd';
import VerticalProductCard from './VerticalProductCard';
import { ArrowLeftIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import TimeCounter from '@com/_atoms/TimeCounter.nd';
import { timeDifference } from '@utilities/timeDifference';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

interface Props {
  className?: string;
  data: any;
  counter?: string;
}

interface counter {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
const CarouselLine = ({ className = '', data }: Props) => {
  const { push } = useRouter();
  const counterTime = (start, end) =>
    timeDifference(new Date(end?.slice(0, -1)), new Date(start));
  const startDate = "2024-10-03T12:52:39";
  const endDate =  "2024-10-03T16:00:00Z";
  const hasCountDown = startDate && endDate?true:false;
  const counter: counter = hasCountDown
    ? counterTime(startDate, endDate)
    : null;
   console.log(counter,'msd');
    
  return (
    <div className={`${className} flex flex-col gap-y-3`}>
      <SectionTitle
        className="px-4 py-3"
        title={data?.title}
        titleClassName="text-base font-semibold text-black"
        actionButton={
          counter ? (
            <>
              <TimeCounter counter={counter} />
            </>
          ) : null
        }
      />
      <ScrollSlider className="px-4 py-2 gap-x-4">
        {data?.products?.map((item, index) => {
          return (
            <VerticalProductCard hasAddToCart productData={item} key={index} />
          );
        })}
        {/* view all */}
        <div
          onClick={() => push(`${routeList?.offer}/${data?.recId}`)}
          className="w-[157px] h-[194px] flex flex-col items-center justify-center"
        >
          <span className="bg-grey-100 h-8 w-8 rounded-full flex justify-center items-center">
            <ArrowLeftIconOutline width={20} height={20} fill="#000" />
          </span>
          <span className="text-sm font-medium pt-4">
            {generalTexts?.viewAll}
          </span>
        </div>
      </ScrollSlider>
    </div>
  );
};
export default CarouselLine;
