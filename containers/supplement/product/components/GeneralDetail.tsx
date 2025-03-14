import { ChatFillIcon, HeartIcon, StarIconFill } from '@com/icons';
import { colors } from '@configs/Theme';

const GeneralDetail = ({
  title = '',
  comments = '0',
  rate = '0',
  likes = '0',
  isActiveLike = false,
}) => (
  <div className="flex flex-col mt-5">
    <div className="flex justify-between">
      <div className="w-full h-20 flex items-center">
        <p className="font-medium">{title}</p>
      </div>
      {/* <div className="flex w-[72px] justify-center items-center">
        <HeartIcon
          width={24}
          height={24}
          stroke={isActiveLike ? colors.red[300] : colors.black}
          fill={isActiveLike ? colors.red[300] : colors.white}
        />
      </div> */}
    </div>
    <div className="flex gap-6">
      <div className="flex justify-center items-center gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <ChatFillIcon width={16} height={16} fill={colors.grey[400]} />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          {+rate !== 0 ? (
            <>
              <span className="text-grey-400 text-sm font-normal">{rate}</span>
              <span className="text-grey-400 text-sm font-normal">امتیاز</span>
            </>
          ) : (
            <span className="text-grey-400 text-sm font-normal">
              بدون امتیاز
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center items-start gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <StarIconFill width={16} height={16} fill={colors.grey[400]} />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          {+comments !== 0 ? (
            <>
              <span className="text-grey-400 text-sm font-normal">
                {comments}
              </span>
              <span className="text-grey-400 text-sm font-normal">نظر</span>
            </>
          ) : (
            <span className="text-grey-400 text-sm font-normal">بدون نظر</span>
          )}
        </div>
      </div>
      {/* <div className="flex justify-center items-center gap-1">
        <div className="flex justify-center items-center h-4 w-4">
          <HeartIcon
            width={16}
            height={16}
            fill={colors.grey[400]}
            stroke={colors.grey[400]}
          />
        </div>
        <div className="h-full flex justify-center items-center gap-1">
          <span className="text-grey-400 text-sm font-normal">{likes}</span>
          <span className="text-grey-400 text-sm font-normal">علاقمند</span>
        </div>
      </div> */}
    </div>
  </div>
);
export default GeneralDetail;
