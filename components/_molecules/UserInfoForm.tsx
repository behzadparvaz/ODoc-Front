import React, { useState } from 'react';
import { useFormik } from 'formik';

import { useAddProfileInfo, useUpdateProfileInfo } from '@api/user/user.rq';
import { profileText } from '@com/texts/profileText';
import { userInfoSchema } from '@utilities/validationSchemas';
import Gender from '@com/_molecules/Gender';
import { TextInput } from '@com/_atoms/NewTextInput';
import { Button } from '@com/_atoms/NewButton';
import ActionBar from '@com/Layout/ActionBar';

interface UserInfoFormProps {
  data?: any;
  handleRegisterOrder?: (value) => void;
}

const UserInfoForm = ({ data }: UserInfoFormProps) => {
  const { mutate: mutateAddProfileInfo, isLoading: addProfileIsLoading } =
    useAddProfileInfo();

  const { mutate: mutateUpdateProfileInfo, isLoading: updateProfileIsLoading } =
    useUpdateProfileInfo();

  const [initialValues] = useState({
    firstName: data ? data?.firstName : '',
    lastName: data ? data?.lastName : '',
    nationalCode: data ? data?.nationalCode : '',
    gender: data ? data?.gender?.id : 1,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: userInfoSchema,
    onSubmit: (values) => {
      if (data) {
        mutateUpdateProfileInfo(values, {});
      } else {
        mutateAddProfileInfo(values);
      }
    },
  });

  const handleChangeForm = (field, e) => {
    formik?.setFieldValue(field, e?.target?.value);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={'flex gap-y-7 p-4 flex-col w-full pb-[84px]'}
      >
        <TextInput
          placeholder={profileText?.firstName}
          label={profileText?.firstName}
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={(e) => handleChangeForm('firstName', e)}
          onBlur={formik.handleBlur}
          isTouched={
            formik.touched.firstName && Boolean(formik.errors.firstName)
          }
          errorMessage={formik.errors.firstName as string}
          maxLength={16}
        />

        <TextInput
          placeholder={profileText?.lastName}
          label={profileText?.lastName}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={(e) => handleChangeForm('lastName', e)}
          onBlur={formik.handleBlur}
          isTouched={formik.touched.lastName && Boolean(formik.errors.lastName)}
          errorMessage={formik.errors.lastName as string}
          maxLength={30}
        />

        <TextInput
          placeholder={profileText?.nationalCode}
          label={profileText?.nationalCode}
          id="nationalCode"
          name="nationalCode"
          type="number"
          value={formik.values.nationalCode}
          onChange={(e) => handleChangeForm('nationalCode', e)}
          onBlur={formik.handleBlur}
          isTouched={
            formik.touched.nationalCode && Boolean(formik.errors.nationalCode)
          }
          errorMessage={formik.errors.nationalCode as string}
          maxLength={10}
        />

        <TextInput
          placeholder={profileText?.mobileNumber}
          label={profileText?.mobileNumber}
          id="mobileNumber"
          name="mobileNumber"
          type="text"
          value={data?.phoneNumber}
          onChange={() => {
            return;
          }}
          disabled
        />

        <Gender
          value={formik?.values.gender}
          name={'gender'}
          onChange={formik?.handleChange}
          label="جنسیت"
        />
      </form>
      <ActionBar type="singleAction" className="z-20" hasDivider>
        <Button
          type="submit"
          className="w-full"
          size="large"
          variant="primary"
          isLoading={addProfileIsLoading || updateProfileIsLoading}
        >
          {data ? 'ویرایش اطلاعات کاربری' : 'ثبت اطلاعات کاربری'}
        </Button>
      </ActionBar>
    </>
  );
};

export default UserInfoForm;
