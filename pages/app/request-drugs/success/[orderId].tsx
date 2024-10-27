import { Button } from '@com/_atoms/NewButton';
import { TimerIcon } from '@com/icons';
import ActionBar from '@com/Layout/ActionBar';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const QuickOrderSuccess = () => {
  const { query, push } = useRouter();
  const orderId = query?.orderId;
  return (
    <div
      className={`w-full bg-white
   h-screen flex flex-col justify-center ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      <div className=" flex justify-center">
        <span className="bg-blue-100 inline-block p-3 rounded-full ">
          <TimerIcon width={32} height={32} fill={colors.blue[400]} />
        </span>
      </div>
      <p className="text-lg text-center font-semibold mt-5">
        درخواست شما ثبت و در انتظار تأیید پزشک است
      </p>
      <p className="text-base text-gray-500 px-6 text-center mt-4">
        سفارش شما در مرحله بررسی پزشک است و در صورت تأیید، توسط داروخانه اعلام
        قیمت خواهد شد.
      </p>

      <ActionBar type="twoActionHorizontal" hasDivider>
        <Button
          variant="primary"
          className="w-full"
          size="large"
          type="button"
          onClick={() => push(routeList?.homeRoute)}
        >
          برگشت به خانه
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          size="large"
          type="button"
          onClick={() => push(`${routeList?.QuickOrderDetail}/${orderId}`)}
        >
          جزییات درخواست
        </Button>
      </ActionBar>
    </div>
  );
};
export default QuickOrderSuccess;
