import { BasketIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';

const HomePageAddressBox = () => {
  return (
    <div className="w-full px-6">
      <p className="text-grey-400 pt-3 pb-2 text-xs">{generalTexts?.sendTo}</p>
      <div className="flex justify-between items-center">
        <div className="">a</div>
        <div className="">
          <BasketIconOutline
            width={22}
            height={22}
            fill={colors?.grey?.[400]}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePageAddressBox;
