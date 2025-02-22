import NextImage from '@com/_core/NextImage';
import { MainLayout } from '@com/Layout';
import { routeList } from '@routes/routeList';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="h-full flex flex-col items-center justify-center gap-y-16">
          <NextImage
            src={'/images/notfound.svg'}
            alt={''}
            width={200}
            height={200}
          />
          <div className="text-center mx-5">
            <h1 className="text-lg font-bold">اینجا گم شدی؟</h1>
            <p className="text-gray-500 mt-2">
              به نظر میاد به صفحه‌ای اومدی که وجود نداره! بیا با هم برگردیم به
              مسیر درست.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full text-center px-6 mb-6 mx-2">
          <Link
            href={routeList.homeRoute}
            className="w-full text-center py-3 bg-surface-tertiary text-black rounded-full hover:bg-gray-200"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
