import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import useWindowSize from '@hooks/useWindowSize';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import { memo, useRef } from 'react';

type Props = {
  imageUrl: string;
  imageLink: string;
  title:string
  index?: number;
};

function MainSliderItem({ imageUrl,title, imageLink, index }: Props) {
  const { width } = useWindowSize();
  const ref = useRef();

  return (
    <>
      <NextLink
        href={imageLink}
      >
        <a
          className={`relative w-full h-full`}
        >
          <div className="!aspect-w-23 !aspect-h-12" ref={ref}>
            <NextImage
              src={imageUrl}
              unoptimized
              alt={title}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, 192))}`}
              layout="fill"
              quality={100}
              objectFit="cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              className="!rounded-lg"
              priority={index === 0 ? true : false}
            />
          </div>
        </a>
      </NextLink>
    </>
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
