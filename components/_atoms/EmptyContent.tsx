import NextImage from '@com/_core/NextImage';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';

interface Props{
  imgSrc:string,
  title:string
}

const EmptyContent = ({imgSrc,title}:Props) => {
  return (
    <div className="flex flex-col items-center mt-28">
<<<<<<< HEAD
      <NextImage
        src={imgSrc}
        width={64}
        height={64}
      />
      <p className="text-base mt-6 text-center text-grey-600 px-6">
        {title}
      </p>
=======
      <NextImage src={imgSrc} width={64} height={64} alt="empty" />
      <p className="text-sm mt-6 text-center text-grey-600 px-6">{title}</p>
>>>>>>> stage
    </div>
  );
};
export default EmptyContent;
