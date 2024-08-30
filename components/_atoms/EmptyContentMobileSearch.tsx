import NextImage from '@com/_core/NextImage';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';

const EmptyContentMobileSearch = () => {
  return (
    <div className="flex flex-col items-center mt-28">
      <NextImage
        src={'/static/images/staticImages/search-empty-content.png'}
        width={64}
        height={64}
      />
      <p className="text-base mt-6 text-center text-grey-600 px-6">
        {mobileSearchTexts?.emptyConent}
      </p>
    </div>
  );
};
export default EmptyContentMobileSearch;
