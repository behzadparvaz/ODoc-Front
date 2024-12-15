import { memo, useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';

type Props = {
  imageUrl: string;
  imageLink: string;
  title: string;
  index?: number;
};

function MainSliderItem({ imageUrl, title, index }: Props) {
  const { push } = useRouter();
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
          alt={title}
          fill
          quality={100}
          style={{ objectFit: 'contain' }}
          loading={'eager'}
        />
      </div>
    </div>
  );
}
MainSliderItem.displayName = 'MainSliderItem';
export default memo(MainSliderItem);
