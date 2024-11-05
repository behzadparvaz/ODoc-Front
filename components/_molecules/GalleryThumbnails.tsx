import NextImage from '@com/_core/NextImage';
import classNames from 'classnames';
import { useState } from 'react';

const GalleryThumbnails = ({ images }) => {
  const [image, setImage] = useState(images[0]);

  const clickOnThumbnailHandler = (selectedImage) => {
    setImage(selectedImage);
  };

  return (
    <>
      <div className="relative w-full h-[140px]">
        <NextImage
          src={image.src}
          alt={`thumbnail-image-${image.id}`}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex justify-start mt-2">
        {images.map((thumbImage) => (
          <div
            key={thumbImage.id}
            onClick={() => clickOnThumbnailHandler(thumbImage)}
            className={classNames(
              'cursor-pointer mx-1 border rounded-lg p-2',
              thumbImage.id === image.id ? 'border-black' : 'border-grey-200',
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
