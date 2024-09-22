import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
interface ImageComponentProps extends ImageProps {
  unoptimized?: boolean;
  alt?: string;
  onClick?: () => void;
}

const NextImage = ({
  src,
  unoptimized,
  alt,
  onClick,
  width,
  height,
  ...rest
}: ImageComponentProps): JSX.Element => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = (e: any) => {
    setImageError(true);
  };

  return (
    <Image
      src={imageError ? '/static/images/staticImages/errorImage.svg' : src}
      unoptimized={unoptimized ?? true}
      alt={alt}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, height))}`}
      width={width}
      height={height}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default NextImage;
