import { Button } from '@com/_atoms/NewButton';
import OTPInput from './otpInputs';
import { motion } from 'framer-motion';
import Icon from '@utilities/icon';

const OtpStep = ({ EditPhoneAction }) => {
  // Animation variants
  const variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  };
  return (
    <motion.div
      className="bg-white rounded-t-[20px] shadow-lg absolute inset-x-0 bottom-0"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <div className="text-md border-b border-grey-200 py-4 flex justify-center font-medium">
        تایید شماره موبایل
      </div>
      <div className="m-4">
        <div className="flex justify-center items-center text-xs text-grey-500 text-center py-3 font-medium">
          <span className="select-none">
            لطفاً کد ارسال شده برای شماره 09364870704 را وارد کنید.
          </span>
        </div>
        <div className="mb-4">
          <span
            onClick={EditPhoneAction}
            className="select-none cursor-pointer bg-grey-100 py-2 font-medium px-4 rounded-full text-xs inline-flex mx-4 gap-0.5"
          >
            <Icon name="PencilLineFill" />
            ویرایش شماره
          </span>
        </div>
        <OTPInput length={6} onComplete={(pin) => console.log(pin)} />
        <div className="mt-4 mb-4 text-center">
          <span
            onClick={() => console.log('resend')}
            className="select-none cursor-pointer inline-block bg-grey-100 py-2 font-medium px-4 rounded-full text-xs"
          >
            ارسال مجدد کد
          </span>
        </div>
        <Button
          variant="primary"
          className="w-full mb-5"
          size="large"
          type="submit"
        >
          تأیید
        </Button>
      </div>
    </motion.div>
  );
};

export default OtpStep;
