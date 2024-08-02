import NextImage from '@com/_core/NextImage';
import { NewArrowLeftIconOutline } from '@com/icons';
import { routeList } from '@routes/routeList';
import NextLink from '@com/_core/NextLink';
import MainLayout from '@com/_template/MainLayout';

import tapsiLogo from '@static/images/staticImages/tapsi-logo.png';
import firstSlidePNG from '@static/images/staticImages/first-slide.png';
import secondSlidePNG from '@static/images/staticImages/second-slide.png';

const Landing = () => {
  return <MainLayout className="p-4 mt-14 flex flex-col gap-5" headerChildren={
    <div className="bg-primary-800 flex-1 p-4 -m-6 flex justify-center">
      <NextImage src={tapsiLogo} height={20} width={85}/>
    </div>
  }>
    <div className="grid grid-cols-11 items-center bg-primary-100 rounded-lg py-6">
      <div className="col-span-6 flex flex-col items-center p-3">
        <div className="xs:w-[122px] sm:w-auto text-center sm:pb-2">
        <h1 className="font-semibold pb-1">پلتفرم ارسال دارو</h1>
          <h3 className="text-sm text-justify font-light">در سـریـعتــرین زمــان داروهاتو دریافت کن</h3>
        </div>
        <NextLink href={routeList.loginRoute}>
          <div className="flex gap-1 bg-primary rounded-md py-2 pr-3 pl-1 sm:w-9/12 justify-center items-center mt-2">
            <span className="text-white font-medium text-sm leading-4">ثبت سفارش دارو</span>
            <NewArrowLeftIconOutline width={24} height={24} stroke={'white'}/>
          </div>
        </NextLink>
      </div>
      <div className="col-span-5 pl-2 text-center">
        <NextImage src={firstSlidePNG}
                   width={160} height={160}
                   quality={20}/>
      </div>
    </div>

    <div className="grid grid-cols-11 items-center bg-primary-300 rounded-lg py-6">
      <div className="col-span-6 flex flex-col items-center p-3">
        <div className="xs:w-[122px] sm:w-auto text-center sm:pb-2">
          <h2 className="font-semibold pb-1">به وسعـــت ایـــران</h2>
          <h3 className="text-sm text-justify font-light">به میـلیـون‌هـا کاربر دسترسی پیدا کنید.</h3>
        </div>
        <NextLink href={routeList.loginRoute}>
          <div className="flex gap-1 bg-primary rounded-md py-2 pr-3 pl-1 sm:w-9/12 justify-center items-center mt-2">
            <span className="text-white font-medium text-sm leading-4">ثبت‌نام داروخانه</span>
            <NewArrowLeftIconOutline width={24} height={24} stroke={'white'}/>
          </div>
        </NextLink>
      </div>
      <div className="col-span-5 pl-2 text-center">
        <NextImage src={secondSlidePNG}
                   width={160} height={160}
                   quality={20}/>
      </div>
    </div>

  </MainLayout>;
};

export default Landing;
