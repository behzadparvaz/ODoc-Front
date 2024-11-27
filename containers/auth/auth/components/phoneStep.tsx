import { Button } from '@com/_atoms/NewButton';
import { TextInput as Input } from '@com/_atoms/NewTextInput';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import PrivacyPolicyText from './PrivacyPolicyText';
import { motion } from 'framer-motion';

interface PhoneStepProps {
  onSubmit: (values: { PhoneNumber: string }) => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ onSubmit }) => {
  const initialValues = { PhoneNumber: '' };

  const validationSchema = Yup.object({
    PhoneNumber: Yup.string()
      .required('شماره موبایل الزامی است')
      .matches(/^[0-9]{11}$/, 'شماره موبایل باید 11 رقم باشد'),
  });

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
        ورود | ثبت نام
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, touched, errors }) => (
          <Form className="my-4 px-4" onSubmit={handleSubmit}>
            <span className="text-xs text-content-tertiary text-center">
              برای استفاده از تمام امکانات تپسی دکتر لازم است وارد شوید. برای
              ورود شماره موبایل خود را وارد کنید
            </span>
            <Field name="PhoneNumber">
              {({ field }: any) => (
                <Input
                  {...field}
                  className="my-2 rounded-md placeholder:text-grey-500"
                  inputClassName="text-left"
                  id="PhoneNumber"
                  placeholder={'09XXXXXXXXX'}
                  maxLength={11}
                  isTouched={touched.PhoneNumber && errors.PhoneNumber}
                  errorMessage={errors.PhoneNumber}
                  autoComplete="off"
                />
              )}
            </Field>
            <PrivacyPolicyText />
            <Button
              variant="primary"
              className="w-full mb-5"
              size="large"
              type="submit"
            >
              تأیید
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default PhoneStep;
