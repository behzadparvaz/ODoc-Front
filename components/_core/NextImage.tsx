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
<<<<<<< HEAD
  const [imageSrc, setImageSrc] = useState(src);
=======
>>>>>>> stage
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return (
    <Image
      src={src || '/static/images/staticImages/errorImage.png'}
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
