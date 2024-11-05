import NextImage from '@com/_core/NextImage';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

const GalleryThumbnails = ({ images }) => {
  const serializeData = useMemo(() => {
    return images.map((image, index) => ({
      id: index,
      src: image,
    }));
  }, [images]);

  const [image, setImage] = useState({
    id: null,
    src: null,
  });

  const clickOnThumbnailHandler = (selectedImage) => {
    setImage(selectedImage);
  };
  useEffect(() => {
    clickOnThumbnailHandler(serializeData[0]);
  }, [images]);

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
        {serializeData.map((thumbImage) => (
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
