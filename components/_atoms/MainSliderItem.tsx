import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import useWindowSize from '@hooks/useWindowSize';
import { routeList } from '@routes/routeList';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import { memo, useRef } from 'react';

type Props = {
  imageUrl: string;
  imageLink: string;
  title: string;
  index?: number;
};

function MainSliderItem({ imageUrl, title, imageLink, index }: Props) {
  const { width } = useWindowSize();
  const ref = useRef();

  return (
    <>
      <NextLink
        href={
          index === 0
            ? `${routeList?.supplementPage}`
            : `${routeList?.prescriptionRegisteration}`
        }
      >
        <div className={`relative w-full h-full px-4`}>
          <div className="!aspect-w-23 !aspect-h-11 overflow-hidden" ref={ref}>
            <NextImage
              src={imageUrl}
              unoptimized
              alt={title}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, 192))}`}
              fill
              quality={100}
              style={{ objectFit: 'contain' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              priority={index === 0 ? true : false}
            />
          </div>
        </div>
      </NextLink>
    </>
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
