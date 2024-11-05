import { useUserSetPassword } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import { generalTexts } from '@com/texts/generalTexts';
import { profileText } from '@com/texts/profileText';
import { userPasswordSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import { useState } from 'react';

const UserPasswordForm = ({ data }) => {
  const { mutate: mutateUserSetPassword } = useUserSetPassword();
  const [initialValues] = useState({
    PhoneNumber: data ? data?.phoneNumber : '',
    Password: '',
    ConfrimPassword: '',
  });
  const formik = useFormik({
    initialValues,
    validationSchema: userPasswordSchema,
    onSubmit: (values) => {
      mutateUserSetPassword(values);
    },
  });
  return (
    <>
      {data ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-y-7 flex-col p-4"
        >
          <Input
            type="password"
            placeholder={profileText?.enterNewPassword}
            label={profileText?.newPassword}
            className="flex-auto"
            labelClassName="font-normal text-xs"
            inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
            id="Password"
            name="Password"
            value={formik.values.Password}
            onChange={formik.handleChange}
            isTouched={
              formik.touched.Password && Boolean(formik.errors.Password)
            }
            errorMessage={formik.errors.Password}
          />
          <Input
            type="password"
            placeholder={profileText?.enterReEnterNewPassword}
            label={profileText?.reEnterNewPassword}
            className="flex-auto"
            labelClassName="font-normal text-xs"
            inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
            id="ConfrimPassword"
            name="ConfrimPassword"
            value={formik.values.ConfrimPassword}
            onChange={formik.handleChange}
            isTouched={
              formik.touched.ConfrimPassword &&
              Boolean(formik.errors.ConfrimPassword)
            }
            errorMessage={formik.errors.ConfrimPassword}
          />
          <Button
            type="submit"
            className="w-full mt-3"
            size="large"
            buttonType="contained"
            variant={'primary'}
          >
            {generalTexts?.confirm}
          </Button>
        </form>
      ) : (
        <div className="pt-36 text-center text-md text-red-600">
          برای ثبت پسورد ابتدا اطلاعات کاربری خود را تکمیل کنید!
        </div>
      )}
    </>
  );
};
export default UserPasswordForm;
