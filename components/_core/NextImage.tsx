import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import classNames from 'classnames';

interface AdvancedImageProps extends ImageProps {
  errorImageSrc?: string;
  blurLevel?: 'sm' | 'md' | 'lg' | 'xl';
}

const NextImage: React.FC<AdvancedImageProps> = ({
  src,
  alt = 'Image',
  width,
  height,
  errorImageSrc = '/images/emptyImage.png',
  blurLevel = 'sm',
  className,
  unoptimized,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageSrc = hasError ? errorImageSrc : src;

  const blurClasses = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
  };

  return (
    <Image
      src={imageSrc}
      unoptimized={unoptimized ?? true}
      alt={alt}
      width={width}
      height={height}
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
      className={classNames(
        'transition-all duration-500',
        isLoading
          ? `opacity-0 ${blurClasses[blurLevel]}`
          : 'opacity-100 blur-none',
        className,
      )}
      {...props}
    />
  );
};

export default NextImage;
