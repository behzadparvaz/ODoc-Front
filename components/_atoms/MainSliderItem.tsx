import { memo, useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import NextImage from '@com/_core/NextImage';
import useWindowSize from '@hooks/useWindowSize';
import { routeList } from '@routes/routeList';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';

type Props = {
  imageUrl: string;
  imageLink: string;
  title: string;
  index?: number;
};

function MainSliderItem({ imageUrl, title, imageLink, index }: Props) {
  const { push } = useRouter();
  const { width } = useWindowSize();
  const ref = useRef();

  return (
    <div
      onClick={() =>
        push(
          index === 1 && `${routeList?.supplementPage}`,
          // `${routeList?.prescriptionRegisteration}`
        )
      }
      className={classNames(
        `relative w-full h-full px-4`,
        index === 1 && 'cursor-pointer',
      )}
    >
      <div className="!aspect-w-23 !aspect-h-14 overflow-hidden" ref={ref}>
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
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
