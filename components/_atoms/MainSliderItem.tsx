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
<<<<<<< HEAD
        <a className={`relative w-full h-full`}>
          <div className="!aspect-w-23 !aspect-h-9" ref={ref}>
=======
        <div className={`relative w-full h-full px-4`}>
          <div className="!aspect-w-23 !aspect-h-11" ref={ref}>
>>>>>>> stage
            <NextImage
              src={imageUrl}
              unoptimized
              alt={title}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, 192))}`}
              layout="fill"
              quality={100}
              objectFit="contain"
              loading={index === 0 ? 'eager' : 'lazy'}
              className="!rounded-base"
              priority={index === 0 ? true : false}
            />
          </div>
<<<<<<< HEAD
        </a>
=======
        </div>
>>>>>>> stage
      </NextLink>
    </>
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
