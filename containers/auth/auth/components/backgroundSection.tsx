import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';
import Link from 'next/link';

const BackgroundSection = () => {
  return (
    <>
      <div className="h-full">
        <NextImage
          src={'/images/login-bg.png'}
          alt="login"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="absolute w-full text-center flex justify-center items-center top-14 z-10">
        <Link href={routeList.landingRoute} className="w-[145px] h-[24px]">
          <NextImage
            src={'/images/logo/tapsi-doctor-logo.svg'}
            width={145}
            height={24}
            alt="tapsi-daroo-logo"
          />
        </Link>
      </div>
    </>
  );
};
export default BackgroundSection;
