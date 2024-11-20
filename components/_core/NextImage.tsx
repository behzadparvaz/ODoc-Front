import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageComponentProps extends ImageProps {
  width?: number;
  height?: number;
  unoptimized?: boolean;
  alt: string;
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

  const handleImageError = () => {
    setImageError(true);
  };

  // Determine the source to use: either the provided src or the error image
  const effectiveSrc = imageError || !src ? '/images/emptyImage.png' : src;

  return (
    <Image
      src={effectiveSrc}
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
