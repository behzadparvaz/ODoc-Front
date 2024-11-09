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

const QuickOrderFailedContainer = () => {
  const { push } = useRouter();
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
          درخواست شما ثبت نشد.
        </p>
        <p className="text-base text-gray-500 px-6 text-center mt-4">
          درخواست شما ثبت نشد. لطفا با ما تماس بگیرید.
        </p>

        <ActionBar type="twoActionVertical" hasDivider>
          <Button
            variant="primary"
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
export default QuickOrderFailedContainer;
