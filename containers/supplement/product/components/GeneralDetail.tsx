import { ChatFillIcon, HeartIcon, StarIconFill } from '@com/icons';
import { colors } from '@configs/Theme';

const GeneralDetail = ({
  title = '',
  comments = '',
  rate = '',
  likes = '',
  isActiveLike = false,
}) => (
  <div className="flex flex-col mt-5">
    <div className="flex justify-between">
      <div className="w-full h-20 flex items-center">
        <p className="font-medium">قرص فولیکوژن اروند فارمد 2 بسته 60 عددی</p>
      </div>
      <div className="flex w-[72px] justify-center items-center">
        <HeartIcon
          width={24}
          height={24}
          stroke={isActiveLike ? colors.red[300] : colors.black}
          fill={isActiveLike ? colors.red[300] : colors.white}
        />
      </div>
    </div>
    <div className="flex gap-6">
      <div className="flex justify-center items-center gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <ChatFillIcon width={16} height={16} fill={colors.grey[400]} />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          <span className="text-grey-400 text-sm font-normal">4/8</span>
          <span className="text-grey-400 text-sm font-normal">امتیاز</span>
        </div>
      </div>
      <div className="flex justify-center items-start gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <StarIconFill width={16} height={16} fill={colors.grey[400]} />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          <span className="text-grey-400 text-sm font-normal">125</span>
          <span className="text-grey-400 text-sm font-normal">نظر</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <HeartIcon
            width={16}
            height={16}
            fill={colors.grey[400]}
            stroke={colors.grey[400]}
          />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          <span className="text-grey-400 text-sm font-normal">400</span>
          <span className="text-grey-400 text-sm font-normal">علاقمند</span>
        </div>
      </div>
    </div>
  </div>
);
export default GeneralDetail;
