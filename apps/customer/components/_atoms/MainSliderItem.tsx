import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import useWindowSize from '@hooks/useWindowSize';
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
            ? 'app/prescription-registeration?title=داروی%20با%20نسخه&type=SP'
            : 'app/otc-medicine'
        }
      >
        <span className={`relative w-full h-full`}>
          <div className="!aspect-w-23 !aspect-h-9" ref={ref}>
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
              className="!rounded-lg"
              priority={index === 0 ? true : false}
            />
          </div>
        </span>
      </NextLink>
    </>
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
