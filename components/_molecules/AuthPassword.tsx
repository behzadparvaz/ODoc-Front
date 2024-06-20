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

interface Props {
  handleChangeForm: (formStatus: 'otp') => void;
  data: any;
}

const AuthPassword = ({ handleChangeForm, data }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const {
    mutate: mutateSendPasswordForLoginWithPassword,
    isLoading: sendVerifyCodeLoading,
  } = useSendOtpForLoginWithPassword();
  const { push, query } = useRouter();
  const { openNotification } = useNotification();
  const fromUrl = query?.from_url;
  const {
    mutate: mutateSendOtpForLoginWithOtp,
    isLoading: sendOtpForLoginWithOtp,
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
            fromUrl ? push(`${fromUrl}`) : push('/');
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
      <SectionTitle
        actionButton={
          <Button
            handleClick={() => handleLoginWithOtp()}
            className="text-teal-700 text-xs !p-0"
          >
            {loginTexts?.loginByOTP}
          </Button>
        }
        descriptionClassName="text-md"
        description={loginTexts?.enterPassword}
        titleClassName="text-sm text-grey-600"
        title={loginTexts.loginByPassword}
      />
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          type={hidePassword ? 'password' : 'text'}
          id="password"
          className="mt-3"
          name="password"
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
              <div onClick={() => setHidePassword(!hidePassword)}>
                {hidePassword ? (
                  <OpenEyeIconFill
                    width={16}
                    height={16}
                    fill={colors.grey[400]}
                  />
                ) : (
                  <CloseEyeIconFill
                    width={16}
                    height={16}
                    fill={colors.grey[400]}
                  />
                )}
              </div>
            )
          }
        />
        <Button
          buttonType="contained"
          variant="primary"
          className="w-full mt-8"
          size="large"
          disabled={sendVerifyCodeLoading}
          type="submit"
          isLoading={sendVerifyCodeLoading}
        >
          <p>{loginTexts.login}</p>
        </Button>
      </form>
    </>
  );
};
export default AuthPassword;
