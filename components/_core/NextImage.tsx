import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

enum ImageDefaultSrc {
  AEROSOL = 'Aerosol',
  CAPSULES = 'capsules',
  CREAM = 'Cream',
  DOUCHE = 'Douche',
  DROPS = 'drops',
  GEL = 'Gel',
  GRANULES = 'granules',
  MOUTHWASH = 'mouthwash',
  OINMENT = 'ointment',
  PILL = 'Pill',
  PLASTER = 'Plaster',
  POWDER = 'powder',
  SHAMPOO = 'Shampoo',
  SOAP = 'Soap',
  SPRAY = 'Spray',
  SUPPOSITORIES = 'Suppositories',
  SUSPENSION = 'suspension',
  SYRUP = 'syrup',
}

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
