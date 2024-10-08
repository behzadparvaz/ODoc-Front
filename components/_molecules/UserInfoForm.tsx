import { useAddProfileInfo, useUpdateProfileInfo } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import { profileText } from '@com/texts/profileText';
import { userInfoSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Gender from '@com/_molecules/Gender';
import Calender from '@com/_atoms/Calender';
import { convertDateToTimestamp, formattingDate } from '@utilities/mainUtils';
import CheckBox from '@com/_atoms/CheckBox.nd';
import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import ImageUpload from '@com/_atoms/fileUploader/ImageUpload';

interface Props {
  data?: any;
  inOrderPage?: boolean;
  handleRegisterOrder?: (value) => void;
  isRegisterInOrderPage?: boolean;
  className?: string;
}

const UserInfoForm = ({
  data,
  inOrderPage,
  handleRegisterOrder,
  isRegisterInOrderPage,
  className = '',
}: Props) => {
  const { mutate: mutateAddProfileInfo } = useAddProfileInfo(
    inOrderPage,
    isRegisterInOrderPage,
  );
  const { mutate: mutateUpdateProfileInfo } = useUpdateProfileInfo(inOrderPage);
  const [disabledForm, setDisabledForm] = useState<boolean>(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [initialValues] = useState({
    firstName: data ? data?.firstName : '',
    lastName: data ? data?.lastName : '',
    nationalCode: data ? data?.nationalCode : '',
    gender: data ? data?.gender?.id : 1,
    isSpecialPatient: false,
    dateOfBirth:
      data && data?.dateOfBrith
        ? convertDateToTimestamp(data?.dateOfBrith)
        : null,
    formFile: null,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: userInfoSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        dateOfBirth: values?.dateOfBirth
          ? formattingDate(new Date(values?.dateOfBirth))
          : null,
        formFile: uploadedFile?.formFile,
      };
      if (data) {
        mutateUpdateProfileInfo(newValues, {});
      } else {
        mutateAddProfileInfo(newValues);
      }
      setDisabledForm(true);
    },
  });
  const handleChangeForm = (field, e) => {
    formik?.setFieldValue(field, e?.target?.value);
    if (inOrderPage) {
      setDisabledForm(false);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`flex gap-y-7 flex-col ${className} w-full`}
    >
      <Gender
        value={formik?.values.gender}
        name={'gender'}
        onChange={formik?.handleChange}
        label="جنسیت"
      />
      <Input
        placeholder={profileText?.firstName}
        label={profileText?.firstName}
        className="flex-auto"
        labelClassName="font-normal text-sm"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
        id="firstName"
        name="firstName"
        value={formik.values.firstName}
        onChange={(e) => handleChangeForm('firstName', e)}
        isTouched={formik.touched.firstName && Boolean(formik.errors.firstName)}
        errorMessage={formik.errors.firstName}
      />
      <Input
        placeholder={profileText?.lastName}
        label={profileText?.lastName}
        className="flex-auto"
        labelClassName="font-normal text-sm"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
        id="lastName"
        name="lastName"
        value={formik.values.lastName}
        onChange={(e) => handleChangeForm('lastName', e)}
        isTouched={formik.touched.lastName && Boolean(formik.errors.lastName)}
        errorMessage={formik.errors.lastName}
      />
      <Input
        placeholder={profileText?.nationalCode}
        label={profileText?.nationalCode}
        className="flex-auto"
        labelClassName="font-normal text-sm"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
        id="nationalCode"
        name="nationalCode"
        type="number"
        value={formik.values.nationalCode}
        onChange={(e) => handleChangeForm('nationalCode', e)}
        isTouched={
          formik.touched.nationalCode && Boolean(formik.errors.nationalCode)
        }
        errorMessage={formik.errors.nationalCode}
      />
      <Calender
        labelClassName="font-normal text-sm"
        label={'تاریخ تولد'}
        name={'dateOfBirth'}
        value={formik?.values.dateOfBirth}
        errorMessage={formik.errors.dateOfBirth}
        onChange={formik?.handleChange}
      />

      {!isRegisterInOrderPage && (
        <div>
          <CheckBox
            handleChange={formik.handleChange}
            label="بیمار خاص"
            labelClassName="text-sm mr-6 font-normal text-grey-700"
            name="isSpecialPatient"
            icon={
              <TickIcon
                width={15}
                height={15}
                stroke={colors.white}
                className="mx-auto mt-[1px]"
              />
            }
            checkedClassName="!bg-grey-500"
            boxClassName="w-4 h-4 rounded-full border-grey-800"
            checked={formik.values.isSpecialPatient}
            className="w-full mt-5 z-0"
          />
        </div>
      )}
      {formik.values.isSpecialPatient && (
        <ImageUpload
          name="formFile"
          title="آپلود عکس کارت ملی"
          previewImageUrl={uploadedFile}
          setPreviewImageUrl={handleFileUpload}
        />
      )}
      {inOrderPage && (
        <div className="flex justify-between">
          <Button
            disabled={disabledForm}
            type="submit"
            size="large"
            buttonType="contained"
            variant={'primary'}
          >
            {data ? 'ویرایش  ' : 'ثبت اطلاعات کاربری'}
          </Button>
        </div>
      )}
      {!inOrderPage && (
        <Button
          type="submit"
          className="w-full mt-3"
          size="large"
          buttonType="contained"
          variant={'primary'}
        >
          {data ? 'ویرایش اطلاعات کاربری' : 'ثبت اطلاعات کاربری'}
        </Button>
      )}
    </form>
  );
};

export default UserInfoForm;
