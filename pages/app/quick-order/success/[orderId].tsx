import Button from '@com/_atoms/Button';
import { TimerIcon } from '@com/icons';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
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
        <span className="bg-yellow-400 inline-block p-3 rounded-full ">
          <TimerIcon width={32} height={32} fill='#fff' />
        </span>
      </div>
      <p className="text-lg text-center font-semibold mt-5">
        درخواست شما با موفقیت ثبت شد
      </p>
      <p className="text-base text-gray-500 px-6 text-center mt-4">
        سفارش شما در مرحله بررسی پزشک است و در صورت تأیید، توسط داروخانه اعلام
        قیمت خواهد شد.
      </p>
      <div className="absolute inset-x-0 bottom-4 px-4">
        <Button
          buttonType="contained"
          variant="primary"
          className="w-full mb-3 !text-white"
          size="large"
          type="button"
          handleClick={() => push(routeList?.homeRoute)}
        >
          برگشت به خانه
        </Button>

        <Button
          buttonType="contained"
          variant="primary"
          className="w-full !bg-gray-100 !text-black"
          size="large"
          type="button"
          handleClick={() => push(`${routeList?.QuickOrderDetail}/${orderId}`)}
        >
          جزییات درخواست
        </Button>
      </div>
    </div>
  );
};
export default QuickOrderSuccess;
