import NextImage from '@com/_core/NextImage';
import { HeadsetIconOutline, NewArrowLeftIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';
import NextLink from '@com/_core/NextLink';
import MainLayout from '@com/_template/MainLayout';

import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';
import TapsiWhiteLogo from '@static/images/staticImages/daroo-logo.svg';
import firstSlidePNG from '@static/images/staticImages/first-slide.png';
import secondSlidePNG from '@static/images/staticImages/second-slide.png';
import { colors } from '@configs/Theme';

const Landing = () => {
  return <MainLayout
    className='mt-[53px]'
    hasBottomNavigation={false}
    headerChildren={
      <div className="bg-primary-800 w-full flex flex-1 -mx-4 -my-6 p-4">
        <NextImage src={tapsiLogo} height={20} width={92}/>
      </div>
    }
  >
    <div
      className="flex flex-col items-center justify-center gap-3 w-full bg-primary-100 h-[calc(100vh-53px)]">
      <h1 className="text-[24px] font-semibold">تپسی دارو پلتفرم ارسال دارو</h1>
      <h3 className="font-semibold">در سریع‌تـرین زمان داروهاتـو دریافت کـن</h3>
      <div className="xs:w-10/12 sm:w-7/12 xs:my-5">
        <NextImage alt={'دارو'} src={firstSlidePNG} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   quality={20}/>
      </div>
      <NextLink href={routeList.loginRoute}>
        <div className="flex gap-2 bg-primary rounded-md p-2.5 w-11/12 justify-center cursor-pointer">
          <span className="text-white font-medium">ثبت سفارش</span>
          <NewArrowLeftIconOutline width={24} height={24} stroke={'white'}/>
        </div>
      </NextLink>
    </div>

    <div className="flex flex-col items-center justify-center gap-3 w-full bg-primary-400 h-[calc(100vh-53px)]">
      <h2 className="text-[24px] font-semibold">اگر داروخانه دارید...</h2>
      <h3 className="w-10/12 text-center">با ثبت‌نـام در تپســی دارو، به میلیون‌هــا کاربر دسترسی پیدا کنید و به
        جمع داروخانه‌های ما بپیوندید.</h3>
      <div className="xs:w-9/12 sm:w-7/12 my-5">
        <NextImage alt={'داروخانه'} src={secondSlidePNG} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   quality={20}/>
      </div>
      <NextLink href={routeList.vmsRoute}>
        <div className="flex gap-2 bg-primary rounded-md p-2.5 w-11/12 justify-center cursor-pointer">
          <span className="text-white font-medium">ثبت‌نام داروخانه</span>
          <NewArrowLeftIconOutline width={24} height={24} stroke={'white'}/>
        </div>
      </NextLink>
    </div>

    <div className="bg-primary flex justify-end py-2 px-4 text-white text-sm">
      <div onClick={() => window.open('tel:02196861727')}
           className="inline-flex items-center gap-1.5 cursor-pointer">
        <span>پشتیبانی</span>
        <span className="bg-white rounded-full p-0.5">
          <HeadsetIconOutline
            width={18}
            height={18}
            fill={colors.teal[600]}
          />
        </span>
      </div>
    </div>

    <div className="bg-[#1E1E1E] py-6 px-4 text-white font-light">
      <TapsiWhiteLogo/>

      <p className="py-5 text-sm text-justify">تپسی دکتر، پلتفرم تهیه سریع و آسان داروهای مورد نیاز است. با استفاده از خدمات ما، داروهای خود
        را از نزدیک ترین داروخانه به سرعت و با اطمینان درب منزل دریافت کنید. تیم پشتیبانی ما همواره آماده پاسخگویی به
        سوالات و رفع نیازهای شماست.</p>

      <div className="flex flex-col gap-2 text-xs">
        <p className="w-full">آدرس: تهران، خیابان خالد استامبولی (وزرا)، کوچه یکم، پلاک ۴</p>
        <p className="w-full">کد پستی: ۱۵۱۳۶۱۵۳۱۱</p>
      </div>

    </div>

  </MainLayout>;
};

export default Landing;
