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
  const [imageSrc, setImageSrc] = useState(
    src || '/static/images/staticImages/errorImage.png',
  );
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageSrc('/static/images/staticImages/errorImage.png');
      setImageError(true);
    }
  };

  const handleLoad = () => {
    setImageError(false);
  };

  return (
    <Image
      src={imageSrc}
      unoptimized={unoptimized ?? true}
      alt={alt}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, height))}`}
      width={width}
      height={height}
      onError={handleImageError}
      onLoad={handleLoad}
      {...rest}
    />
  );
};

export default NextImage;
