import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import classNames from 'classnames';
import { SkeletonSvg } from '@utilities/SkeletonSvg';

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

interface AdvancedImageProps extends ImageProps {
  errorImageSrc?: string;
  blurLevel?: 'sm' | 'md' | 'lg' | 'xl';
}

const NextImage: React.FC<AdvancedImageProps> = ({
  src,
  alt = 'Image', // Default alt text for accessibility
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

  // Determine the actual image source
  const imageSrc = hasError ? errorImageSrc : src;

  // Map blur levels to Tailwind classes
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
