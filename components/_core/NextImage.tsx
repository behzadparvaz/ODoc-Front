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
  alt,
  width,
  height,
  errorImageSrc = '/images/emptyImage.png',
  blurLevel = 'md',
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
    <div className="relative overflow-hidden">
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, height))}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Image
        src={imageSrc}
        unoptimized={unoptimized ?? true}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(width, height))}`}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        className={classNames(
          'relative z-10 will-change-auto transition-all duration-500',
          blurClasses[blurLevel],
          isLoading ? 'opacity-0' : 'opacity-100 !blur-none',
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default NextImage;
