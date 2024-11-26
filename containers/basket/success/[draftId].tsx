import { Button } from '@com/_atoms/NewButton';
import { TimerIcon } from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const QuickOrderSuccessContainer = () => {
  const { query, push } = useRouter();
  const draftId: string = query?.draftId as string;

  return (
    <MainLayout>
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
          درخواست شما ثبت و در انتظار تأیید داروخانه است
        </p>
        <p className="text-base text-gray-500 px-6 text-center mt-4">
          سفارش شما به داروخانه های اطراف ارسال شد، برای ادامه فرآیند خرید باید
          منتظر تأیید داروخانه باشید
        </p>

        <p className="flex text-normal text-gray-500 px-6 text-center mt-4 gap-2 justify-center">
          کد سفارش:
          <span className="cursor-pointer font-semibold">{draftId}</span>
        </p>

        <ActionBar type="twoActionVertical" hasDivider>
          <Button
            variant="primary"
            className="w-full"
            size="large"
            type="button"
            onClick={() =>
              push(`${routeList?.ordersHistory}/${draftId}?previousPage=basket`)
            }
          >
            جزییات سفارش
          </Button>
          <Button
            variant="text"
            className="w-full"
            size="large"
            type="button"
            onClick={() => push(routeList?.homeRoute)}
          >
            برگشت به خانه
          </Button>
        </ActionBar>
      </div>
    </MainLayout>
  );
};
export default QuickOrderSuccessContainer;
