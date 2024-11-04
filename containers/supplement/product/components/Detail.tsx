import ShowDetailBottomSheet from '@com/_organisms/ShowDetailBottomSheet';
import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import classNames from 'classnames';
import { useState } from 'react';

const Detail = () => {
  const [isShow, setIsShow] = useState(false);
  const { addModal } = useModal();
  const isShowProductDetailHandler = () => {
    setIsShow((prev) => !prev);
  };

  const openDetailBottomSheetHandler = ({ title, description }) => {
    addModal({
      modal: ShowDetailBottomSheet,
      props: {
        title: title,
        description: description,
      },
    });
  };
  return (
    <div className="px-4">
      <h1 className="font-medium mb-2">معرفی محصول</h1>
      <p
        className={classNames(
          `text-content-tertiary mb-3`,
          isShow ? '' : 'max-h-11 line-clamp-2',
        )}
      >
        قرص فولیکوژن اروند فارمد مخصوص درمان و پیشگیری از ریزش مو ساخته شده است.
        مصرف این مکمل به تقویت فولیکول‌ها و ریشه موها کمک کرده و در نتیجه ریزش
        مو را کاهش می‌دهد. ریزش مو و داشتن موهای ضعیف گاهی به دلیل داشتن رژیم
        غذایی نامناسب و یا سوء تغذیه رخ می‌دهد. از آنجایی که این محصول حاوی
        ویتامین‌ها، مواد معدنی و دیگر مواد مورد نیاز برای تقویت مو است، به کمک
        آن می‌توان موهایی سالم و محکم داشت. با استفاده از این قرص سلامت عمومی
        بدن نیز بهبود یافته و به تقویت سیستم ایمنی کمک می‌شود. این قرص حاوی ال
        متیونین، ال سیستین، زینک، فولیک اسید، مس، سلنیوم، بیوتین و برخی از
        ویتامین‌های مورد نیاز برای تقویت موها است.
      </p>
      <div className="flex justify-end">
        <span
          onClick={isShowProductDetailHandler}
          className="h-8 px-3 py-1 font-medium cursor-pointer"
        >
          مشاهده بیشتر
        </span>
      </div>
      <h1 className="font-medium mb-2">مشخصات محصول</h1>
      <div className="mt-2">
        <div className="w-full flex gap-1">
          <span className="font-medium text-content-secondary">
            کشور تولید کننده:
          </span>
          <span className="font-normal text-content-tertiary">ایران</span>
        </div>
        <div className="w-full flex gap-1">
          <span className="font-medium text-content-secondary">
            کشور تولید کننده:
          </span>
          <span className="font-normal text-content-tertiary">ایران</span>
        </div>
        <div className="w-full flex gap-1">
          <span className="font-medium text-content-secondary">
            کشور تولید کننده:
          </span>
          <span className="font-normal text-content-tertiary">ایران</span>
        </div>
      </div>
      <div
        onClick={() =>
          openDetailBottomSheetHandler({
            title: 'سبد خرید',
            description:
              'روزانه ۱عدد قرص ترجیحا صبح بعد از صبحانه به همراه یک لیوان آب میل کنید.',
          })
        }
        className="flex justify-between mt-6 cursor-pointer h-[102px]"
      >
        <div className="flex flex-col">
          <h1 className="font-medium mb-2">معرفی محصول</h1>
          <p className="text-content-tertiary line-clamp-2">
            روزانه ۱عدد قرص ترجیحا صبح بعد از صبحانه به همراه یک لیوان آب میل
            کنید.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ChevronLeftIconOutline
            width={36}
            height={36}
            fill={colors.grey[400]}
          />
        </div>
      </div>
      <div
        onClick={() =>
          openDetailBottomSheetHandler({
            title: 'منع مصرف',
            description:
              'در صورت بارداری، شیردهی، تصمیم برای باردار شدن و یا احتمال بارداری، قبل از مصرف با پزشک یا داروساز مشورت نمایید. در ظرف در بسته در دمای ۱۵ الی ۳۰ درجه۸ سانتیگراد، دور از رطوبت، نور و حرارت نگهداری شود. این فراورده صرفا مکمل رژیمی-غذایی بوده و جهت تشخیص، درمان یا پیشگیری از بیماری نیست. در صورت داشتن هر نوع بیماری یا حساسیت پیش از مصرف با پزشک مشورت کنید. در صورت بروز هر گونه عارضه جانبی با پزشک مشورت نمایید. تا موقع مصرف دارو را درون جعبه نگهداری نمایید. بیش از دوز تعیین شده از این دارو استفاده نکنید. مصرف در کودکان و نوزادان ممنوع است. از دسترس کودکان دور نگه دارید.',
          })
        }
        className="flex justify-between mt-6 cursor-pointer h-[102px]"
      >
        <div className="flex flex-col">
          <h1 className="font-medium mb-2">منع مصرف</h1>
          <p className="text-content-tertiary line-clamp-2">
            در صورت بارداری، شیردهی، تصمیم برای باردار شدن و یا احتمال بارداری،
            قبل از مصرف با پزشک یا داروساز مشورت نمایید. در ظرف در بسته در دمای
            ۱۵ الی ۳۰ درجه۸ سانتیگراد، دور از رطوبت، نور و حرارت نگهداری شود.
            این فراورده صرفا مکمل رژیمی-غذایی بوده و جهت تشخیص، درمان یا پیشگیری
            از بیماری نیست. در صورت داشتن هر نوع بیماری یا حساسیت پیش از مصرف با
            پزشک مشورت کنید. در صورت بروز هر گونه عارضه جانبی با پزشک مشورت
            نمایید. تا موقع مصرف دارو را درون جعبه نگهداری نمایید. بیش از دوز
            تعیین شده از این دارو استفاده نکنید. مصرف در کودکان و نوزادان ممنوع
            است. از دسترس کودکان دور نگه دارید.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ChevronLeftIconOutline
            width={36}
            height={36}
            fill={colors.grey[400]}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
