import { Button } from '@com/_atoms/NewButton';
import NextImage from '@com/_core/NextImage';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';

const UpdatingContainer = () => {
  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center justify-center gap-y-3 pb-[85px] px-4">
        <div className="w-full h-[340px] flex justify-center items-center">
          <NextImage
            src="/images/updating.png"
            alt="updating"
            width={328}
            height={340}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-3">
          <span className="text-xl font-semibold text-content-primary">
            عدم اتصال
          </span>
          <span className="text-base text-content-secondary text-center">
            ما در حال بروزرسانی سیستم هستیم لطفا دقایقی دیگر تلاش کنید.
          </span>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdatingContainer;
