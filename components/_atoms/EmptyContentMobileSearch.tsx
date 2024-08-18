import NextImage from '@com/_core/NextImage';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';

const EmptyContentMobileSearch = () => {
  return (
    <div className='flex flex-col items-center mt-20'>
      <NextImage
        src={'https://www.aquacalling.com/img/empty.png'}
        width={200}
        height={161}
      />
      <p className="text-sm text-center text-grey-400 px-6 font-bold">
        {mobileSearchTexts?.emptyConent}
      </p>
    </div>
  );
};
export default EmptyContentMobileSearch;
