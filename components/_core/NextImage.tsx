import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import classNames from 'classnames';

interface AdvancedImageProps extends ImageProps {
  errorImageSrc?: string;
  blurLevel?: 'sm' | 'md' | 'lg' | 'xl';
  imageClassName?: string;
}

const NextImage: React.FC<AdvancedImageProps> = ({
  src,
  alt = 'Image',
  errorImageSrc = '/images/emptyImage.png',
  blurLevel = 'sm',
  className,
  unoptimized,
  imageClassName,
  fill,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const imageRef = useRef<HTMLDivElement | null>(null);

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
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
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
      className={classNames(
        className,
        fill ? 'relative w-full h-full' : 'relative',
      )}
      style={
        fill ? { position: 'relative', width: '100%', height: '100%' } : {}
      }
    >
      {isVisible && (
        <Image
          src={imageSrc}
          unoptimized={unoptimized ?? true}
          alt={alt}
          fill={fill}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          className={classNames(
            'transition-all duration-300',
            isLoading
              ? `opacity-0 ${blurClasses[blurLevel]}`
              : 'opacity-100 blur-none',
            imageClassName,
          )}
          {...props}
        />
      )}
      {!isVisible && (
        <Image
          src={'/images/emptyImage.png'}
          unoptimized={unoptimized ?? true}
          alt={alt}
          fill={fill}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          className={classNames(
            'transition-all duration-300',
            isLoading
              ? `opacity-0 ${blurClasses[blurLevel]}`
              : 'opacity-100 blur-none',
          )}
          {...props}
        />
      )}
      {/* Placeholder while loading */}
    </div>
  );
};

export default NextImage;
