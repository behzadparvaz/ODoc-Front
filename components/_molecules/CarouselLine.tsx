import dynamic from 'next/dynamic';
import SectionTitle from './SectionTitle.nd';
import VerticalProductCard from './VerticalProductCard';
import { ArrowLeftIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const ScrollSlider = dynamic(() => import('@com/_molecules/ScrollSlider.nd'));

interface Props {
  className?: string;
  data: any;
}

const CarouselLine = ({ className = '', data }: Props) => {
  const { push } = useRouter();
  return (
    <div className={`${className} flex flex-col gap-y-3`}>
      <SectionTitle
        className="px-4 py-3"
        title={data?.title}
        titleClassName="text-base font-semibold text-black"
      />
      <ScrollSlider className="px-2 py-2 gap-x-4">
        {data?.products?.map((item, index) => {
          return (
            <VerticalProductCard hasAddToCart productData={item} key={index} />
          );
        })}
        {/* view all */}
        <div
          onClick={() => push(`${routeList?.offer}/${data?.recId}`)}
          className="w-[157px] h-[222px] flex flex-col items-center justify-center border-r border-grey-100"
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
