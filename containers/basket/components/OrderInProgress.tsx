import { TimerIcon } from '@com/icons';
import { colors } from '@configs/Theme';

const OrderInProgress = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      <span className="bg-yellow-400 rounded-full w-[56px] h-[56px] flex justify-center items-center">
        <TimerIcon width={32} height={32} fill={colors.white} />
      </span>
      <div className="text-sm font-light flex flex-col gap-4 items-center">
        <span className="text-md font-semibold text-center">
          سفارش شما با موفقیت ثبت شد
        </span>
        <span className="text-center">
          سفارش شما به داروخانه های اطراف ارسال شد، برای ادامه فرآیند خرید باید
          منتظر تأیید داروخانه باشید
        </span>
      </div>
    </div>
  );
};
export default OrderInProgress;
