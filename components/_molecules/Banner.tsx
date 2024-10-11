import NextImage from '@com/_core/NextImage';
import { CSSProperties } from 'react';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import SectionTitle from './SectionTitle.nd';

interface Props {
  className?: string;
  data: any;
  style?: CSSProperties;
}
const Banner = ({ className = '', data, style = {} }: Props) => {
  const bannerData = data[0];
  return (
    <div style={style} className={`w-full ${className}`}>
      <SectionTitle
        className="py-3"
        title={'پیشنهادهای شگفت انگیز'}
        titleClassName="text-base font-semibold text-black"
      />

      <div className="!aspect-w-23 !aspect-h-9">
        <NextImage
          src={bannerData?.icon}
          unoptimized
          alt={bannerData?.title}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg('100%', 192))}`}
          layout="fill"
          quality={100}
          objectFit="contain"
          loading={'eager'}
          className="!rounded-lg"
        />
      </div>
    </div>
  );
};
export default Banner;