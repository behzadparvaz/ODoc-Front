import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const NextImage = ({
  src,
  unoptimized,
  ...otherProps
}: ImageProps): JSX.Element => {
  const [imageError, setImageError] = useState<boolean>(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Image
      {...otherProps}
      unoptimized={unoptimized ?? true}
      src={
        src
          ? imageError
            ? '/static/images/staticImages/DefaultProductImage.png'
            : src
          : '/static/images/staticImages/DefaultProductImage.png'
      }
      onError={handleImageError}
    />
  );
};
export default NextImage;
