import TextInput from '@com/_atoms/TextInput';
import Button from '@com/_atoms/Button.od';
import { useFormik } from 'formik';
import { useODocSendMobileNumber } from '@api/auth/oDocAuth.rq';
import SectionTitle from './SectionTitle.nd';
import { loginSchema } from '@utilities/validationSchemas';
import { convertPersianNumbersToEnglishNumbers } from '@utilities/mainUtils';

const AuthMobileNumber = () => {
  const {
    mutate: mutateODocSendMobileNumber,
    isLoading: oDocSendMobileNumberLoding,
  } = useODocSendMobileNumber();
  const formik = useFormik({
    initialValues: {
      PhoneNumber: '',
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutateODocSendMobileNumber(values, {
        onSuccess: (responseData: any) => {
          if (responseData?.success) {
            alert('good');
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
      <SectionTitle
        descriptionClassName="text-md"
        description={'لطفا شماره موبایل خود را وارد کنید'}
        titleClassName="text-sm text-grey-600"
        title="ورود/ثبت نام"
      />
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          className="border border-grey-200 mt-3 !rounded-lg"
          id="PhoneNumber"
          name="PhoneNumber"
          inputMode="numeric"
          placeholder={'09123456789'}
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

        <Button
          type="contained"
          variant="primary"
          className="w-full mt-3"
          size="large"
          disabled={oDocSendMobileNumberLoding}
          handleClick={formik.submitForm}
          isLoading={oDocSendMobileNumberLoding}
        >
          <p>تــــایید</p>
        </Button>
      </form>
    </>
  );
};
export default AuthMobileNumber;
