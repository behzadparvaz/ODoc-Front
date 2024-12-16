import NextImage from '@com/_core/NextImage';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

interface image {
  id?: number;
  src?: string;
}
interface GalleryThumbnailsProps {
  images: image[] | [];
}
const GalleryThumbnails = ({ images = [] }: GalleryThumbnailsProps) => {
  const serializeData = useMemo(() => {
    return images.map((image, index) => ({
      id: image.id || index,
      src: image.src || image,
    }));
  }, [images]);

  const [selectedImage, setSelectedImage] = useState<any>(
    serializeData[0] || {},
  );

  const clickOnThumbnailHandler = (thumbImage) => {
    setSelectedImage(thumbImage);
  };

  useEffect(() => {
    if (serializeData.length > 0) {
      setSelectedImage(serializeData[0]);
    }
  }, [serializeData]);

  return (
    <>
      <div className="relative w-full h-[140px]">
        {selectedImage.src && (
          <NextImage
            src={selectedImage.src}
            alt={`thumbnail-image-${selectedImage.id}`}
            fill
            imageClassName="object-contain"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex justify-start mt-2">
        {serializeData.map((thumbImage) => (
          <div
            key={thumbImage.id}
            onClick={() => clickOnThumbnailHandler(thumbImage)}
            className={classNames(
              'cursor-pointer mx-1 border rounded-lg p-2 transition duration-200 ease-in-out',
              thumbImage.id === selectedImage?.id
                ? 'border-black'
                : 'border-grey-200 hover:border-black',
            )}
          >
            <NextImage
              src={thumbImage.src}
              alt={`thumbnail-${thumbImage.id}`}
              width={38}
              height={38}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryThumbnails;
