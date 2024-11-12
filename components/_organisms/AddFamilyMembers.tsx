import { useAddFamilyMembers, useGetProfileRelation } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { generalTexts } from '@com/texts/generalTexts';
import { profileText } from '@com/texts/profileText';
import useModal from '@hooks/useModal';
import { addFamilyMemberSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from '@com/_atoms/Select';
import Calender from '@com/_atoms/Calender';
import { formattingDate } from '@utilities/mainUtils';
import Gender from '@com/_molecules/Gender';

export default function AddFamilyMembers({ data }) {
  const { mutate: mutateAddFamilyMembers } = useAddFamilyMembers();
  let familyArr = [];
  data?.map((item) => {
    familyArr.push({
      firstName: item?.fisrtname,
      lastName: item?.lastName,
      nationalCode: item?.nationalCode,
      phoneNumber: item?.phoneNumber,
      relation: item?.relation?.id,
      dateOfBirth: item?.dateOfBirth,
      gender: item?.gender?.id,
    });
  });

  const { data: relations } = useGetProfileRelation();
  const { removeLastModal } = useModal();
  const [initialValues] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    relation: 1,
    dateOfBirth: null,
    gender: 1,
  });
  const formik = useFormik({
    initialValues,
    validationSchema: addFamilyMemberSchema,
    onSubmit: (values) => {
      const body = {
        FamilyModels: [
          ...familyArr,
          {
            ...values,
            dateOfBirth: values?.dateOfBirth
              ? formattingDate(new Date(values?.dateOfBirth))
              : null,
          },
        ],
      };
      mutateAddFamilyMembers(body, {
        onSuccess: () => {
          removeLastModal();
        },
      });
    },
  });

  return (
    <BottomModalContainer
      height={'560px'}
      hasCloseButton={true}
      title={generalTexts?.add}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex gap-y-4 pt-6 flex-col"
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
          labelClassName="font-normal text-xs"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik?.handleChange}
          isTouched={
            formik.touched.firstName && Boolean(formik.errors.firstName)
          }
          errorMessage={formik.errors.firstName}
        />
        <Input
          placeholder={profileText?.lastName}
          label={profileText?.lastName}
          className="flex-auto"
          labelClassName="font-normal text-xs"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik?.handleChange}
          isTouched={formik.touched.lastName && Boolean(formik.errors.lastName)}
          errorMessage={formik.errors.lastName}
        />
        <Select
          name="relation"
          labelClassName="font-normal text-xs"
          selectClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
          options={relations}
          label={'نسبت'}
          onChange={formik.handleChange}
          value={formik?.values?.relation}
          errorMessage={formik.errors.relation}
        />
        <Input
          placeholder={profileText?.nationalCode}
          label={profileText?.nationalCode}
          className="flex-auto"
          labelClassName="font-normal text-xs"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
          id="nationalCode"
          name="nationalCode"
          type="string"
          value={formik.values.nationalCode}
          onChange={formik?.handleChange}
          isTouched={
            formik.touched.nationalCode && Boolean(formik.errors.nationalCode)
          }
          errorMessage={formik.errors.nationalCode}
        />
        <Input
          placeholder={'09123456789'}
          label={generalTexts?.phoneNumber}
          className="flex-auto"
          labelClassName="font-normal text-xs"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4 custom-input"
          id="phoneNumber"
          name="phoneNumber"
          type="string"
          value={formik.values.phoneNumber}
          onChange={formik?.handleChange}
          isTouched={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          errorMessage={formik.errors.phoneNumber}
        />
        <Calender
          labelClassName="font-normal text-xs"
          label={'تاریخ تولد'}
          name={'dateOfBirth'}
          value={formik?.values.dateOfBirth}
          errorMessage={formik.errors.dateOfBirth}
          onChange={formik?.handleChange}
        />
        <Button
          type="submit"
          className="w-full mt-3"
          size="large"
          buttonType="contained"
          variant={'primary'}
        >
          {generalTexts?.register}
        </Button>
      </form>
    </BottomModalContainer>
  );
}
