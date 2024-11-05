import dynamic from 'next/dynamic';
import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { mobileSearchTexts } from '@com/texts/mobileSearchText';
import NextImage from '@com/_core/NextImage';
import sampleImage from '@static/images/staticImages/sample-druge.png';
import { generalTexts } from '@com/texts/generalTexts';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';

const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));
const Button = dynamic(() => import('@com/_atoms/Button'));

const SearchByImageContainer = () => {
  const { back } = useRouter();
  return (
    <div
      className={`w-full pt-4 min-h-screen bg-white  ${
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
      }`}
    >
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
      <div className="w-full flex justify-center flex-wrap py-3 px-6">
        <NextImage src={sampleImage} width={358} height={358} alt="" />
        <p className="text-xs text-grey-600 font-semibold pt-3 px-4">
          آیا منظور شما «ژلوفن ۴۰۰» بود؟
        </p>
      </div>
      <div className="flex px-6 gap-x-4">
        <Button
          className="flex flex-1"
          variant="primary"
          buttonType="contained"
        >
          {generalTexts?.yes}
        </Button>
        <Button
          className="flex flex-1"
          variant="tertiary"
          buttonType="outlined"
        >
          {generalTexts?.no}
        </Button>
      </div>
    </div>
  );
};
export default SearchByImageContainer;
