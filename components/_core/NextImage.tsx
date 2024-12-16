import React, { useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

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

  // Lazy loading logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after the image is loaded
        }
      },
      { threshold: 0.1 }, // Adjust the threshold as needed
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className={classNames(className ? className : 'relative')}
    >
      {isVisible ? (
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
          )}
          {...props}
        />
      ) : (
        <Image
          src={'/images/emptyImage.png'}
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
          )}
          {...props}
        />
      )}
      {!isVisible && (
        <div className="h-full w-full bg-gray-200 animate-pulse" />
      )}{' '}
      {/* Placeholder while loading */}
    </div>
  );
};

export default NextImage;
