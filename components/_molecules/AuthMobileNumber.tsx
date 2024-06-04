import TextInput from "@com/_atoms/TextInput"
import Button from "@com/_atoms/Button"
import { useFormik } from "formik";
import { useSendMobileNumber } from "@api/auth/oDocAuth.rq";
import SectionTitle from "./SectionTitle.nd";
import { loginSchema } from "@utilities/validationSchemas";
import { convertPersianNumbersToEnglishNumbers } from "@utilities/mainUtils";


interface Props {
    handleChangeForm: (registerData:any,formStatus: 'otp' | 'password') => void;
}

const AuthMobileNumber = ({ handleChangeForm }: Props) => {
    const { mutate: mutatesendMobileNumber, isLoading: sendMobileNumberLoding } = useSendMobileNumber();
    const formik = useFormik({
        initialValues: {
            PhoneNumber: '',
        },
        enableReinitialize: true,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            mutatesendMobileNumber(
                values,
                {
                    onSuccess: (responseData: any) => {
                        const data = responseData?.data;
                        if (data?.message === "succeeded") {
                            if (data?.hasPassword) {
                                handleChangeForm(data,'password')
                            }
                            else {
                                handleChangeForm(data,'otp')
                            }
                        }
                    },
                }
            );
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
                    buttonType="contained"
                    variant="primary"
                    className="w-full mt-8"
                    size="large"
                    disabled={sendMobileNumberLoding}
                    type="submit"
                    isLoading={sendMobileNumberLoding}
                >
                    <p>تــــایید</p>
                </Button>
            </form>
        </>
    )
}
export default AuthMobileNumber
