import MobileLayout from '@com/_template/MobileLayout';
import NextImage from '@com/_core/NextImage';
import { IconButton } from '@material-ui/core';
import { ArrowLeftIconOutline, HamburgerMenu, ProfileIconOutline } from '@com/icons';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';

import tapsiLogo from '@static/images/staticImages/tapsi-logo.png';
import firstSlidePNG from '@static/images/staticImages/first-slide.png';
import secondSlidePNG from '@static/images/staticImages/second-slide.png';
import enemadPNG from '@static/images/staticImages/enemad.png';
import NextLink from '@com/_core/NextLink';

const Landing = () => {
  const { push } = useRouter();
  const isLogin = true;

  const onClickProfile = () => {
    push(routeList.profile);
  };

  return <MobileLayout>
    <div className="bg-primary-800 w-full flex justify-between items-center p-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <IconButton className="rounded-full !p-0" size={'small'}>
          <HamburgerMenu fill={'white'} width={24} height={24}/>
        </IconButton>
        <NextImage src={tapsiLogo} height={20} width={85}/>
      </div>
      <div className="text-white">
        <IconButton className="!bg-white rounded-full" size={'small'} onClick={onClickProfile}>
          <ProfileIconOutline fill={isLogin ? '#FF5622' : '#01A0A3'} width={12} height={12}/>
        </IconButton>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center gap-3 w-full bg-primary-100 h-[calc(100vh-56px)]">
      <h1 className="text-[28px] font-semibold">تپسی دارو پلتفرم ارسال دارو</h1>
      <h3 className="text-xl font-semibold">در سریع‌تـرین زمان داروهاتـو دریافت کـن</h3>
      <div className="w-9/12 my-5">
        <NextImage src={firstSlidePNG} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill
                   quality={20}/>
      </div>
      <NextLink href={routeList.loginRoute}>
        <div className="flex gap-2 bg-primary rounded-md p-2.5 w-11/12 justify-center mt-5">
          <span className="text-white font-medium">ثبت سفارش</span>
          <ArrowLeftIconOutline width={24} height={24} fill={'white'}/>
        </div>
      </NextLink>
    </div>

    <div className="flex flex-col items-center justify-center gap-3 w-full bg-primary-400 h-[calc(100vh-56px)]">
      <h2 className="text-[28px] font-semibold">اگر داروخانه دارید...</h2>
      <h3 className="w-10/12 text-center">با ثبت‌نـام در تپســی دارو، به میلیون‌هــا کاربر دسترسی پیدا کنید و به
        جمع داروخانه‌های ما بپیوندید.</h3>
      <div className="w-9/12 my-5">
        <NextImage src={secondSlidePNG}
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   fill
                   quality={20}/>
      </div>
      <NextLink href={routeList.loginRoute}>
        <div className="flex gap-2 bg-primary rounded-md p-2.5 w-11/12 justify-center mt-5">
          <span className="text-white font-medium">ثبت‌نام داروخانه</span>
          <ArrowLeftIconOutline width={24} height={24} fill={'white'}/>
        </div>
      </NextLink>
    </div>

    <div className='h-[36px] bg-primary'>

    </div>

    <div className='bg-[#1E1E1E] py-6 px-4 text-white font-light text-xs leading-6'>
      <NextImage src={tapsiLogo} height={20} width={85}/>

      <p className='py-5 text-justify'>تپسی دکتر، پلتفرم تهیه سریع و آسان داروهای مورد نیاز است. با استفاده از خدمات ما، داروهای خود را از نزدیک ترین داروخانه به سرعت و با اطمینان درب منزل دریافت کنید. تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات و رفع نیازهای شماست.</p>

      <div className='grid grid-cols-6 justify-between items-start'>
        <div className='col-span-4'>
          <p>آدرس: تهران، سعادت‌آباد، بالاتر از میدان کاج، بلوار بهزاد، نبش کوچه باغستان، پلاک ۲</p>
          <p>کد پستی: ۱۹۹۸۶۳۵۸۲۰</p>
        </div>
        <div className='col-span-2 flex justify-end items-end h-full'>
          <span className='p-3 bg-white rounded-2xl flex'>
            <NextImage src={enemadPNG} height={61} width={58}/>
          </span>
        </div>
      </div>

    </div>

  </MobileLayout>;
};

export default Landing;
