import TextInput from '@com/_atoms/TextInput';
import Button from '@com/_atoms/Button';
import { useFormik } from 'formik';
import { useSendMobileNumber } from '@api/auth/oDocAuth.rq';
import SectionTitle from './SectionTitle.nd';
import { loginSchema } from '@utilities/validationSchemas';
import { convertPersianNumbersToEnglishNumbers } from '@utilities/mainUtils';
import NextLink from '@com/_core/NextLink';
import { routeList } from '@routes/routeList';

interface Props {
  handleChangeForm: (registerData: any, formStatus: 'otp' | 'password') => void;
}

const AuthMobileNumber = ({ handleChangeForm }: Props) => {
  const { mutate: mutatesendMobileNumber, isPending: sendMobileNumberLoding } =
    useSendMobileNumber();
  const formik = useFormik({
    initialValues: {
      PhoneNumber: '',
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutatesendMobileNumber(values, {
        onSuccess: (responseData: any) => {
          if (responseData?.message === 'succeeded') {
            handleChangeForm(responseData, 'otp');
          }
        },
      });
    },
  });

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      formik.submitForm();
    }
  };
  return (
    <>
      <div className="text-md border-b border-grey-200 py-4 flex justify-center font-medium">
        ورود | ثبت نام
      </div>
      <form className="my-4 px-4" onSubmit={formik.handleSubmit}>
        <TextInput
          label="شماره موبایل"
          labelClassName="text-md  font-medium"
          className="!rounded-base !h-[52px] !bg-grey-100 placeholder:text-grey-500 !border-none"
          id="PhoneNumber"
          fontSize="md"
          name="PhoneNumber"
          inputMode="numeric"
          placeholder={'مثال *********09'}
          value={formik.values.PhoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formik?.setFieldValue(
              'PhoneNumber',
              convertPersianNumbersToEnglishNumbers(e?.target?.value),
            )
          }
          error={
            formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
          }
          helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
          onKeyPress={onKeyPress}
          maxLength={11}
          autoComplete="off"
        />
        <NextLink href={routeList?.policyRoute}>
          <span>
            <p className="text-xs text-grey-500 text-center py-5">
              با ثبت نام
              <span className="inline-block text-black px-1">در تپسی دکتر</span>
              شرایط و مقررات را می پذیرم.
            </p>
          </span>
        </NextLink>
        <Button
          buttonType="contained"
          variant="primary"
          className="w-full mb-5"
          size="large"
          disabled={sendMobileNumberLoding}
          type="submit"
          isLoading={sendMobileNumberLoding}
        >
          <p>تأیید</p>
        </Button>
      </form>
    </>
  );
};
export default AuthMobileNumber;
