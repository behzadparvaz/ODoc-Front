import Button from '@com/_atoms/Button';
import { useFormik } from 'formik';
import {
  useSendOtpForLoginWithOtp,
  useSendOtpForLoginWithPassword,
  useSendVerifyCode,
} from '@api/auth/oDocAuth.rq';
import { loginTexts } from '@com/texts/loginTexts';
import SectionTitle from './SectionTitle.nd';
import TextInput from '@com/_atoms/TextInput';
import { useState } from 'react';
import { CloseEyeIconFill, OpenEyeIconFill } from '@com/icons';
import { colors } from '@configs/Theme';
import { loginWithPassword } from '@utilities/validationSchemas';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';
import { generalTexts } from '@com/texts/generalTexts';
import { setUserAction } from '@redux/user/userActions';
import { useDispatch } from 'react-redux';
import { routeList } from '@routes/routeList';

interface Props {
  handleChangeForm: (formStatus: 'otp') => void;
  data: any;
}

const AuthPassword = ({ handleChangeForm, data }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const {
    mutate: mutateSendPasswordForLoginWithPassword,
    isPending: sendVerifyCodeLoading,
  } = useSendOtpForLoginWithPassword();
  const { push, query } = useRouter();
  const { openNotification } = useNotification();
  const fromUrl = query?.from_url;
  const {
    mutate: mutateSendOtpForLoginWithOtp,
    isPending: sendOtpForLoginWithOtp,
  } = useSendOtpForLoginWithOtp();

  const formik = useFormik({
    initialValues: {
      PhoneNumber: data?.phoneNumber,
      password: '',
    },
    enableReinitialize: true,
    validationSchema: loginWithPassword,
    onSubmit: (values) => {
      mutateSendPasswordForLoginWithPassword(values, {
        onSuccess: (responseData: any) => {
          if (responseData?.message === 'succeeded') {
            Cookies.set('token', responseData?.token, { expires: 365 });
            localStorage.setItem('token', responseData?.token);
            dispatch(
              setUserAction({
                mobileNumber: data?.phoneNumber,
                token: data?.token,
              }),
            );
            fromUrl ? push(`${fromUrl}`) : push(routeList.homeRoute);
            openNotification({
              message: loginTexts?.loginSuccessfully,
              type: 'success',
              notifType: 'successOrFailedMessage',
            });
          } else {
            openNotification({
              message: generalTexts?.error,
              type: 'error',
              notifType: 'successOrFailedMessage',
            });
          }
        },
        onError: () => {
          openNotification({
            message: generalTexts?.error,
            type: 'error',
            notifType: 'successOrFailedMessage',
          });
        },
      });
    },
  });

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      formik.submitForm();
    }
  };
  const handleLoginWithOtp = () => {
    mutateSendOtpForLoginWithOtp(
      { PhoneNumber: data?.phoneNumber },
      {
        onSuccess: (responseData: any) => {
          if (responseData?.message === 'succeeded') {
            openNotification({
              message: loginTexts?.resendOtpCodeSuccessfully,
              type: 'success',
              notifType: 'successOrFailedMessage',
            });
            handleChangeForm('otp');
          } else {
            openNotification({
              message: generalTexts?.error,
              type: 'error',
              notifType: 'successOrFailedMessage',
            });
          }
        },
        onError: () => {
          openNotification({
            message: generalTexts?.error,
            type: 'error',
            notifType: 'successOrFailedMessage',
          });
        },
      },
    );
  };
  return (
    <>
      <div className="text-md border-b border-grey-200 py-4 flex justify-center font-medium">
        ورود | ثبت نام
      </div>
      <form className="my-4 px-4" onSubmit={formik.handleSubmit}>
        <TextInput
          type={hidePassword ? 'password' : 'text'}
          id="password"
          label="رمز عبور"
          labelClassName="text-md font-medium"
          className="!rounded-lg !h-[52px] !bg-grey-100 placeholder:text-grey-500 !border-none"
          name="password"
          fontSize="md"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            (formik.touched.password && formik.errors.password) ||
            (JSON.stringify(formik.errors) !== '{}'
              ? formik.errors.toString()
              : null)
          }
          onKeyPress={onKeyPress}
          maxLength={32}
          autoComplete="off"
          leftIcon={
            formik.values.password?.length >= 1 && (
              <span
                className="pt-1 inline-block"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? (
                  <OpenEyeIconFill width={32} height={32} fill={colors.black} />
                ) : (
                  <CloseEyeIconFill
                    width={32}
                    height={32}
                    fill={colors.black}
                  />
                )}
              </span>
            )
          }
        />
        <Button
          buttonType="outlined"
          variant="tertiary"
          className="w-full my-2.5 !border-none"
          size="large"
          type="button"
          handleClick={() => handleLoginWithOtp()}
        >
          {loginTexts?.loginByOTP}
        </Button>
        <Button
          buttonType="contained"
          variant="primary"
          className="w-full"
          size="large"
          disabled={sendVerifyCodeLoading}
          type="submit"
          isLoading={sendVerifyCodeLoading}
        >
          <p>تایید</p>
        </Button>
      </form>
    </>
  );
};
export default AuthPassword;
