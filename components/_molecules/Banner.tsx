import NextImage from '@com/_core/NextImage';
import SectionTitle from './SectionTitle.nd';

interface Props {
  className?: string;
  data: any;
  isShownTitle?: boolean;
}

const Banner = ({ className = '', data, isShownTitle }: Props) => {
  const bannerData = data[0];
  return (
    <div className={`w-full ${className}`}>
      {isShownTitle && (
        <SectionTitle
          className="py-3"
          title={'پیشنهادهای شگفت انگیز'}
          titleClassName="text-sm font-semibold text-black"
        />
      )}
      <div className="!aspect-w-23 !aspect-h-9">
        <NextImage
          src={bannerData?.icon}
          alt={bannerData?.title}
          fill
          style={{ objectFit: 'contain' }}
          quality={100}
          loading={'eager'}
        />
      </div>
    </div>
  );
};
export default Banner;
