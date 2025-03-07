import { useRouter } from 'next/router';

import { ArrowRightIconOutline } from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';

const Policy = () => {
  const { back } = useRouter();
  return (
    <MainLayout>
      <div className="w-full px-4 pb-6 pt-4 bg-white">
        <div className="flex items-center gap-x-2">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => back()}
          >
            <ArrowRightIconOutline
              width={24}
              height={24}
              fill={colors?.black}
            />
          </div>
          <h1 className="text-sm">قوانین استفاده از تپسی دکتر</h1>
        </div>
        <p className="text-xs text-gray-600 mt-6 mb-8">
          در صورت استفاده از برنامه تپسی دکتر شما قوانین و شرایط زیر را قبول
          کرده و باید مطابق آن‌ها از سرویس استفاده کنید. حق به روز رسانی و ایجاد
          تغییرات در این قوانین و شرایط استفاده بدون هیچ اطلاع قبلی برای تپسی
          دکتر محفوظ است. عدم رعایت هر کدام از قوانین زیر ممکن است منجر به حذف و
          یا محدودیت حساب کاربری کاربران شود.
        </p>
        <h2 className="text-xs font-semibold text-gray-600">
          ماده ۱ . اصطلاحات و تعاریف
        </h2>
        <p className="text-xs leading-7 text-gray-600 mt-3">
          ۱. شرکت: شرکت نوآفرینان رادین پارس به شماره ثبت 621468 که نسبت به
          ارائه خدمات اقدام می‌کند.
          <br />
          ۲. تپسی دکتر: خدمات نرم‌افزاری شرکت جهت برقراری ارتباط بین کاربران
          خدمت‌دهنده و خدمت‌گیرنده برای ارائه خدمات تخصصی سلامت محور اعم از
          داروخانه و نظایر آن از طرف کاربر خدمت‌دهنده به کاربر خدمت‌گیرنده.
          <br />
          ۳. اپلیکیشن: نرم‌افزار و برنامه متعلق به شرکت که به منظور استفاده از
          خدمات تپسی ‌دکتر، حق استفاده موقت از آن برابر شرایط مندرج در قرارداد
          های خصوصی و سند حاضر به کاربران یا طرف‌های تجاری شرکت اعطا می‌شود.
          <br />
          ۴. قرارداد خصوصی: توافق کتبی یا الکترونیکی فی‌مابین شرکت و کاربر
          خدمت‌دهنده و خدمت‌گیرنده برای بهره‌برداری موقت از نرم‌افزار.
          <br />
          ۵. کاربر: شخصی حقیقی یا حقوقی اعم از خدمت‌گیرنده و خدمت‌دهنده است که
          بر اساس شرایط و قوانین حاضر از طریق اینترنت به اپلیکیشن متصل و از
          خدمات تپسی دکتر بهره‌مند می گردد.
          <br />
          ۶. کاربران: از کاربران خدمت‌دهنده و گیرنده، تحت عنوان کاربران یاد
          می‌شود.
          <br />
          ۷. کاربر خدمت‌دهنده: شخص حقیقی یا حقوقی واجد صلاحیتی است که در
          اپلیکیشن خدمت‌دهنده تپسی ‌دکتر برای دریافت خدمات ثبت‌‌نام کرده ‌است و
          بر‌اساس قوانین کشور جمهوری اسلامی ایران مجوز یا پروانه معتبر مورد نیاز
          برای ارائه خدمت مورد نظر در حوزه تخصص ثبت شده ذیربط را دارد و ممنوعیت
          یا منعی از طرف مراجع ذی‌صلاح برای فعالیت ندارد.
          <br />
          ۸. کاربر خدمت‌گیرنده: شخص حقیقی یا حقوقی است که در اپلیکیشن
          خدمت‌گیرنده تپسی ‌دکتر برای ارسال درخواست خدمت ثبت‌‌نام کرده‌ است.
          <br />
          ۹. حساب کاربری: حسابی است که اشخاص برای استفاده از خدمات تپسی دکتر در
          اپلیکیشن ساخته‌اند.
          <br />
          ۱۰. کد تخفیف: کدی است که توسط تپسی دکتر به نفع خدمت گیرنده، صادر و
          تامین اعتبار شده و خدمت گیرنده با وارد کردن آن در اپلیکیشن موجب معافیت
          تمام یا قسمتی از هزینه های خدمات ارائه شده می گردد. <br />
          ۱۱. اطلاعات محرمانه: اطلاعاتی که توسط کاربران در اختیار تپسی ‌دکتر
          قرار می‌گیرد، اعم از اطلاعاتی که به صورت مستقیم از سوی کاربران درتپسی
          ‌دکتر ثبت می‌شود و همچنین اطلاعاتی که به صورت خودکار و در نتیجه
          بهره‌برداری از خدمات تپسی ‌دکتر توسط شرکت تولید می‌شود.
          <br />
          ۱۲. قوانین و مقررات جمهوری اسلامی ایران: قانون اساسی، قوانین عادی،
          آیین‌نامه‌های اجرایی، بخشنامه‌ها، دستورالعمل‌ها و کلیه ضوابط قانونی
          حاکم بر انجام موضوع قرارداد، از قبیل قوانین حوزه بهداشت و درمان و علوم
          پزشکی.
          <br />
          ۱۳. مشاوره یا توصیه: هرگونه گفتار و نوشتاری که در پاسخ به درخواست
          کاربر خدمت‌گیرنده از سوی کاربر خدمت‌دهنده ( از طریق بستر تپسی ‌دکتر)
          به وی ارائه می‌شود.
        </p>
        <h2 className="text-xs font-semibold text-gray-600 mt-8">
          ماده ۲. مسئولیت و شرایط تپسی ‌دکتر
        </h2>
        <p className="text-xs leading-7 text-gray-600 mt-3">
          ۱. شرکت برای فراهم کردن بستر استفاده از خدمات نرم‌افزاری توسط کاربران
          تلاش می‌کند، بدیهی است ارائه تضمین نسبت به اجرا شدن آن روی همه
          دستگاه‌ها یا شبکه‌های ارتباطی امکان پذیر نمی باشد. <br />
          ۲. شرکت با تمام امکانات خود از جمله، واحد رسیدگی به شکایات و واحد
          میانجی‌‌گری، تمامی تلاش خود را برای جلب رضایت کاربران و رفع هرگونه
          چالش های احتمالی در زمان استفاده از خدمات تپسی ‌دکتر به کار می‌گیرد.{' '}
          <br />
          ۳. شرکت با استفاده از نهادهای نظارتی خود و انجام نظرسنجی از کاربران در
          پایان خدمات ارائه شده، سعی در ارائه خدمات با کیفیت و مطلوب به کاربران
          می نماید. <br />
          ۴. در راستای اصل محرمانگی، اطلاعات کاربران به عنوان اطلاعات محرمانه
          نزد شرکت می باشد، مگر برابر قانون و تصمیم مقام ذی‌صلاح قضایی که شرکت
          مکلف به ارائه اطلاعات مورد درخواست به مراجع مذکور می باشد. بدیهی است
          موضوع این بند شامل دسترسی افرادی که در زنجیره ارائه خدمت به کاربر
          نهایی می باشند، نمی‌شود. <br />
          ۵. چنان‌چه هر یک از کاربران تپسی ‌دکتر در زمان استفاده از خدمات آن با
          مشکل و چالشی مواجه شوند، برابر شرایط فوق می‌توانند مشکل و چالش خود را
          از طریق واحد رسیدگی به شکایات تپسی دکتر مطرح و در جریان بگذارند. شرکت
          یا طرف تجاری ذیربط حسب مورد پیگیری لازم را بنا به مورد انجام خواهد داد
          و تلاش خود را جهت حل و فصل آنها به‌عمل خواهد آورد. <br />
          ۶. همه اطلاعات مورد نیاز کاربران درباره نحوه و شرایط ارائه خدمات
          تپسی‌دکتر و استفاده از نرم‌افزار‌های ارائه‌دهنده خدمات اعم از
          خدمت‌گیرنده و خدمت‌دهنده، توسط شرکت در نرم‌افزار قرار داده شده است.
          اشخاص می‌توانند با مراجعه به قسمت مذکور و مطالعه آن‌ کاملا با شرایط
          ذکر شده و خدمات تپسی‌دکتر آشنا شوند. همچنین همکاران شرکت در مرکز تماس
          پاسخگوی هرگونه ابهام و سوال کاربران می باشند <br />
          ۷. مسئولیت‌های شرکت، مندرج در این متن، فقط در فرضی متصور است که
          کاربران از طریق اپلیکیشن و بستر آن اقدام به اخذ خدمات کرده باشند.{' '}
          <br />
          ۸. تپسی‌دکتر هیچ‌گونه دسترسی به محتوای تماس بین خدمت‌گیرنده و
          خدمت‌دهنده ندارد.
        </p>{' '}
        <h2 className="text-xs font-semibold text-gray-600 mt-8">
          ماده ۳. تعهدات و مسئولیت کاربران
        </h2>
        <p className="text-xs leading-7 text-gray-600 mt-3">
          ۱. کاربران متعهد می‌شوند هیچ‌گاه از خدمات تپسی دکتر به صورتی استفاده
          نکنند که به تپسی دکتر، شرکت‌های گروه تپسی و شرکای آن و اشخاص ثالث
          صدمه‌ای (‌اعم از مادی و معنوی) وارد شود. در صورتی که کاربران از
          امکانات فراهم شده در خدمات تپسی ‌دکتر در جهت منافع شخصی و یا آسیب مادی
          یا معنوی به منافع شرکت و اشخاص ثالث سوء استفاده کنند، شرکت ضمن داشتن
          حق قطع خدمات و غیرفعال کردن حساب کاربری آن‌ها، مجاز خواهد بود با
          مراجعه به مراجع ذی‌صلاح، نسبت به پیگیری قانونی از جمله مطالبه خسارات
          وارد شده اقدام کند. <br />
          ۲. با ساختن حساب کاربری و همچنین با استفاده از خدمات تپسی‌دکتر،
          کاربران می‌پذیرند و مکلف هستند که از خدمات ارائه شده برای انجام هرگونه
          فعالیت غیر‌قانونی، خلاف شرع و مخالف با عرف جامعه پرهیز نمایند.
          <br />
          ۳. کاربران می‌پذیرند که شرکت ممکن است از ارسال پیامک، ایمیل و یا اعلان
          ارتباطی و یا هرگونه روش ارتباطی دیگری برای برقراری ارتباط با آن‌ها
          استفاده کند. <br />
          ۴. شرکت ممکن است کدهای تخفیفی را به عنوان هدیه به کاربران ارائه نماید.
          با وارد کردن این کدها در نرم‌افزار، یا درصدی از هزینه خدمات کاسته و یا
          درصدی از هزینه خدمات پس از آن به کاربر برگردانده ‌و یا مبلغ مشخصی به
          حساب کاربر در اپلیکیشن تپسی ‌دکتر اضافه ‌می‌شود. نحوه ارائه این خدمات
          و تعیین مهلت استفاده از آن‌ها منوط به تشخیص و صلاح‌دید شرکت یا طرف
          تجاری است و در صورت عدم تخصیص کدهای مذکور، بدیهی است کاربران حق طرح
          هر‌گونه ادعا و اعتراضی را در این خصوص نخواهند داشت. <br />
          ۵. در صورت تخصیص کد تخفیف توسط شرکت و یا طرف تجاری،کد مزبور مختص هر
          کاربر، صرفاً توسط همان کاربر قابل استفاده خواهد بود و قابل انتقال به
          دیگران نیستند. همچنین چنانچه شرکت در فضاهای عمومی به نحوی که در دسترس
          عموم باشد این کدها را منتشر کرده باشد، کاربر مجاز نیست کدهای تخصیص
          داده شده و یا عرضه عموم شده را به صورت عمومی با هر نیتی منتشر و عرضه
          کند مگر با اجازه و تایید شرکت.
          <br />
          ۶. کاربران می‌پذیرند اعتباری که در حساب کاربری خود دارند مستقل از روش
          کسب قانونی آن می باشد (اگر در نتیجه افزایش اعتبار از طریق درگاه بانک
          یا وارد کردن کدهای تخفیفی که شرکت در اختیار آن‌ها قرار داده یا هر روش
          دیگری باشد) فقط برای استفاده از خدمات تپسی ‌دکتر قابل استفاده است و
          امکان دریافت این وجه به صورت نقد وجود ندارد.
          <br />
          ۷. کاربران می‌پذیرند کدهایی که جهت افزایش اعتبار یا کاهش هزینه ارائه
          خدمات به آن‌ها داده می‌شود، ممکن است منقضی شوند. از آنجایی که شرکت
          برای ارائه این کدها هزینه‌ای از کاربران دریافت نمی‌کند، این حق برای
          شرکت محفوظ است که مبلغ یا درصد تاثیر این کدها را حتی پس از تخصیص، بر
          اساس شرایط کد اختصاص داده شده، تغییر دهد یا در صورت لزوم آن‌ها را باطل
          کند. همچنین در صورتی که شرکت تشخیص دهد، اعمال این کد به علت خطای فنی
          یا تخلف صورت گرفته و یا غیرقانونی بوده است، می‌تواند این کدها یا
          اعتباری که در نتیجه استفاده از آن به حساب کاربر افزوده شده را باطل یا
          حذف کند.
          <br />
          ۸. مسئولیت تامین اینترنت و سخت‌افزار لازم و همچنین پرداخت هزینه‌های
          مربوط به آن‌ها برای استفاده از خدمات تپسی ‌دکتر به عهده کاربران است.
          <br />
          ۹. کاربران متعهد می‌شوند پس از اتمام استفاده از خدمات ارائه شده در
          اپلیکیشن، از اطلاعاتی که در نتیجه استفاده از خدمات تپسی دکتر کسب
          کرده‌اند، هیچ‌گونه استفاده‌ای نکنند و کلیه اطلاعات مبادله شده بین
          طرفین، محرمانه تلقی می‌شود. ذخیره کردن اطلاعات کاربران در دستگاه تلفن
          همراه یا به هر شیوه دیگر ممنوع و مغایر با قوانین تپسی‌دکتر است. همچنین
          کاربران متعهد می‌شوند در طول زمان استفاده از خدمات و اپلیکیشن تپسی
          دکتر، فقط در شرایط ضروری و به میزان مورد نیاز از اطلاعاتی که از
          کاربران ارائه شده است، استفاده کنند. استفاده کاربران از این اطلاعات
          باید مطابق با قوانین مملکتی، عرف جامعه و قوانین تپسی ‌دکتر باشد. در هر
          صورت، اطلاعات مذکور به صورت امانت در اختیار کاربران قرار گرفته است و
          در صورت نقض تعهدات مذکور، شرکت و شخص ذی‌نفع، مجاز به پیگیری حقوقی و
          کیفری موضوع خواهد بود.
          <br />
          ۱۰. نسبت به استفاده کاربران از خدمات تپسی دکتر کاربران مکلفند آن را
          وسیله‌ای برای تبلیغات و بازاریابی کالا و خدمات شخصی خود قرار ندهند و
          از هرگونه معرفی و عرضه محصولات و خدمات شخصی و یا متعلق به دیگران
          خودداری کنند. در صورتی که شرکت به هر نحوی نقض این بند را احراز کند،
          می‌تواند در خصوص ادامه فعالیت کاربر تصمیم مقتضی را اتخاذ کند.
          <br />
          ۱۱. با استفاده کاربران از خدمات تپسی دکتر، می‌پذیرند و اعلام می‌کنند
          که متن حریم خصوصی تپسی‌دکتر را مطالعه کرده و مورد قبول ایشان است.
          <br />
          ۱۲. کاربران می‌پذیرند که تپسی ‌دکتر صرفاً ارائه‌دهنده خدماتی است که
          ارتباط بین کاربران خدمت‌دهنده با خدمت‌گیرنده را به منظور توافق بر
          ارائه خدمت مورد نظر فراهم می‌کند، از این رو تپسی ‌دکتر هیچ دخالت و
          مسئولیتی نسبت به خدمت مورد درخواست کاربر خدمت‌گیرنده نداشته و همچنین
          هیچ دخالت و مسئولیتی نسبت به نوع، چگونگی و کیفیت خدمات ارائه شده از
          سوی کاربر خدمت‌دهنده ندارد.
          <br />
          ۱۳. در خدمات تپسی دکتر کاربر خدمت‌دهنده مختار است یک درخواست را بپذیرد
          یا رد کند، همچنین کاربر خدمت‌گیرنده مختار است پس از ارسال درخواست و تا
          زمان مشخص شدن کاربر خدمت‌دهنده و قبل از ارائه خدمت مورد نظر، اقدام به
          لغو درخواست خود کند. بنابراین، هر درخواستی که از سوی کاربران خدمت
          دهنده یا خدمت گیرنده قبول و ارائه می‌شود، باید به عنوان یک قرارداد
          لازم مستقل بین آن‌ها و رابطه قراردادی بین خود کاربران در نظر گرفته
          شود. در نتیجه رعایت کامل قوانین و ضوابط در اجرای موضوع هر درخواست، به
          طور کامل بر عهده کاربران است و هیچ مسئولیتی از این بابت به عهده تپسی
          دکتر نیست.
          <br />
          تبصره ۱. شرکت می‌تواند در صورت رد بی‌دلیل درخواست توسط کاربر
          خدمت‌گیرنده و یا لغو بی‌دلیل و به کرات درخواست توسط کاربر خدمت‌دهنده،
          نسبت به غیرفعال کردن حساب کاربری آن‌ها به صورت موقت یا دائم اقدام کند.
          <br />
          ۱۴.خدمات تپسی ‌دکتر ممکن است با مشارکت شرکت‌ها یا طرف تجاری یا هر شخص
          ثالث دیگری ارائه شود که تپسی ‌دکتر کنترلی روی آن‌ها ندارد. در چنین
          شرایطی، کاربران می‌پذیرند که این خدمات، شرایط و قوانین مختص خود را
          دارند و تپسی ‌دکتر مسئولیتی در خصوص قوانین و خدمات این شرکت‌ها به عهده
          ندارد.
          <br />
          ۱۵.از آنجایی که ممکن است شخص یا اشخاصی غیر از کاربرخدمت‌گیرنده از حساب
          کاربری او استفاده کند، مسئولیت پرداخت هزینه‌های مربوطه متوجه کاربر
          خدمت‌گیرنده است. هرگونه مسئولیت قانونی استفاده‌کننده یا خدمت‌گیرنده از
          حساب کاربری، نسبت به کاربر خدمت‌دهنده و شرکت متوجه کاربر خدمت‌گیرنده
          است و بدین ترتیب کاربر مذکور و گیرندگان واقعی خدمت مورد نظر نسبت به
          شرکت دارای مسئولیت تضامنی هستند.
          <br />
          ۱۶.کاربران متعهد می گردند که از هیچ بخشی از سرویس سوء استفاده نکرده و
          آن را بدون اجازه‌نامه کتبی از شرکت کپی و همانند سازی ننمایند.
        </p>{' '}
        <h2 className="text-xs font-semibold text-gray-600 mt-8">
          ماده ۴. هزینه‌ها و پرداخت
        </h2>
        <p className="text-xs leading-7 text-gray-600 mt-3">
          ۱. پرداخت هزینه‌های اعلام شده توسط تپسی ‌دکتر فقط از طریق روش‌هایی که
          توسط شرکت مشخص می‌شود امکان پذیر است. هرگونه روش دیگری نظیر کارت به
          کارت، تهاتری و غیره مورد تایید شرکت نیست و در این صورت شرکت هیچ‌گونه
          مسئولیتی بر عهده نخواهد داشت.
          <br />
          ۲. با توجه به اینکه هزینه ارائه خدمات از طرف شرکت مشخص می‌شود و
          کاربران پس از استفاده از آن نمی‌توانند اعتراضی نسبت به هزینه اعلام شده
          داشته باشند. لذا کاربران در صورت قبول و استفاده از خدمات، متعهد به
          پرداخت هزینه هستند. به همین منظور کاربران با قبول این شرایط و قوانین،
          به شرکت اختیار می‌دهند که از محل اعتبار کاربری خود، مبالغ مورد مطالبه
          را دریافت و وصول کند.
          <br />
          ۳. با استفاده از خدمات اپلیکیشن توسط کاربران، امکان استرداد هزینه‌هایی
          که آنها برای استفاده از خدمات اپلیکیشن به شرکت می‌پردازند، وجود ندارد.
          <br />
          ۴. کاربران می‌پذیرند که باید هزینه ارائه خدمات از طرف تپسی ‌دکتر را
          مستقل از هرگونه مشکلی که ممکن است در برنامه تپسی دکتر جهت پرداخت
          آنلاین به وجود آید به شرکت پرداخت کنند. در صورتی که به دلیل مشکلی در
          برنامه یا مشکلات ارتباطی از جمله اینترنت و شبکه تلفن همراه امکان
          پرداخت از طریق نرم‌افزار فراهم نشود، کاربران همچنان موظف به پرداخت
          هزینه‌های ارائه خدمات خواهند بود. در این شرایط پرداخت هزینه ممکن است
          با هماهنگی کاربران با مرکز تماس شرکت به روش‌های دیگر صورت پذیرد. در
          صورتی‌ که کاربران به هر دلیلی از جمله مشکلات نرم‌افزار پرداخت را انجام
          نداده باشند، شرکت یا طرف تجاری حق دارد هزینه را از سایر اعتبارات کاربر
          اعم از اعتبار کاربران در تپسی ‌دکتر، کیف پول تپسی یا سایر شرکت‌های
          مرتبط با تپسی دکتر کسر و برداشت نماید و کابر با استفاده از خدمات تپسی
          دکتر ضمن اعطای وکالت در این خصوص به تپسی دکتر، حق هر گونه اعتراضی را
          از خود سلب و ساقط می نماید و در نهایت و عدم وصول ما به ازای خدمات، تا
          تصفیه کامل هزینه خدمات، تپسی دکتر می تواند حساب کاربری آن‌ها را مسدود
          نماید.
          <br />
          ۵. کاربر خدمت‌گیرنده می‌پذیرد جبران هرگونه اقدامی علیه کاربر
          خدمت‌دهنده در زمان استفاده از خدمات تپسی ‌دکتر بر عهده ایشان است. در
          چنین مواردی شرکت حق دارد این هزینه‌ها را از اعتبار موجود در حساب تپسی
          ‌دکتر یا کیف پول سوپر اپ تپسی و یا مطابق بند فوق ، از کاربر
          خدمت‌گیرنده کسر یا از او وصول کند. در صورتی که اعتبار موجود نزد شرکت
          به میزان خسارات وارده و هزینه‌های مترتب بر آن نباشد، کاربر خدمت‌گیرنده
          و یا شرکت، مجاز به پیگیری و وصول مطالبات مذکور خواهند بود. علاوه بر آن
          شرکت حق مراجعه به مراجع ذی‌صلاح قانونی در راستای جبران خسارات مادی و
          معنوی را خواهد داشت.
          <br />
          ۶. در صورتی که کاربر خدمت‌گیرنده از خدمات ارائه شده راضی نباشد، اعلام
          نارضایتی حداکثر تا ۴۸ ساعت بعد از دریافت خدمت از طریق پشتیبانی تپسی
          دکتر صورت می پذیرد و هرگونه تصمیم‌گیری در این خصوص منوط به بررسی
          کارشناسی توسط تپسی ‌دکتر است و نتیجه آن به کاربر اعلام خواهد شد.
          <br />
          ۷. تعویض و یا بازگرداندن محصول به فراخور قوانین و دستورالعمل های محصول
          و خدمت ارائه شده می باشد و در صورتی که خدمات ارائه شده در قالب بسته
          بندی و نحو آن باشد و کاربر خدمت گیرنده، محصول سفارش داده شده را پس از
          تحویل، از بسته‌بندی استاندارد خود خارج و یا از آن استفاده کند، هر گونه
          ادعا و درخواستی از جمله عودت وجه، تعویض یا بازگرداندن آن محصول قابل
          پذیرش نخواهد بود.
        </p>
        <h2 className="text-xs font-semibold text-gray-600 mt-8">
          ماده۵. شرایط عمومی
        </h2>
        <p className="text-xs leading-7 text-gray-600 mt-3">
          ۱. در صورتی که شرکت یا طرف تجاری به هر دلیلی به این نتیجه برسد که حضور
          هر یک از کاربران می‌تواند امنیت و آرامش کسب و کار و یا دیگر کاربران را
          در معرض تهدید قرار دهد، طبق صلاحدید خود مجاز به حذف دسترسی و یا مسدود
          و یا محدودکردن حساب کاربر مذکور یا عدم اجازه استفاده از خدمات به صورت
          موقتی یا دائم است. در این صورت، کاربر حق طرح هیچگونه ادعا و یا اعتراضی
          را نخواهد داشت.
          <br />
          ۲. در صورتی که کاربر مواردی همچون اقلام قاچاق، غیرمجاز و غیرقانونی و
          توجها خدمات سلامت محور چنانچه خارج از فهرست داروهای مصوب وزارت بهداشت
          و معاونت غذا و دارو را ثبت سفارش کند، شرکت مجاز است حساب کاربری و
          دسترسی به امکانات سفارش دهنده را لغو دائم کند.
        </p>
      </div>
    </MainLayout>
  );
};
export default Policy;
