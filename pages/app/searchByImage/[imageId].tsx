import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import SectionTitle from '@com/_molecules/SectionTitle.nd';
import NextImage from '@com/_core/NextImage';
import sampleImage from '@static/images/staticImages/sample-druge.png';
const Button = dynamic(() => import('@com/_atoms/Button'));

const searchByImage = () => {
  const { back } = useRouter();

  return (
    <div className="w-full pt-4 min-h-screen bg-white">
      <div className="flex pl-4 pr-3 items-center gap-x-2">
        <Button className="!p-0" handleClick={back}>
          <ArrowRightIconOutline
            height={24}
            width={24}
            fill={colors?.grey[600]}
          />
        </Button>

        <SectionTitle title={mobileSearchTexts?.searchByImage} />
      </div>
      <div className="w-full flex justify-center pt-3 px-4">
        <NextImage src={sampleImage} width={358} height={358} />
      </div>
      <p className='text-sm text-grey-600 font-semibold pt-3 px-4'>آیا منظور شما «ژلوفن ۴۰۰» بود؟</p>
    </div>
  );
};
export default searchByImage;
