
import { useAddFamilyMembers } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { generalTexts } from '@com/texts/generalTexts';
import { profileText } from '@com/texts/profileText';
import useModal from '@hooks/useModal';
import { addFamilyMemberSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function AddFamilyMembers({ data }) {

  const { mutate: mutateAddFamilyMembers } = useAddFamilyMembers()
  let familyArr = []
  data?.map((item) => {
    familyArr.push({
      FirstName: item?.fisrtname,
      LastName: item?.lastName,
      NationlaCode: item?.nationalCode,
      PhoneNumber: item?.phoneNumber
    })
  })
  const { removeLastModal } = useModal()
  const [initialValues] = useState(
    {
      FirstName: '',
      LastName: '',
      NationlaCode: '',
      PhoneNumber: ''
    }

  )
  const formik = useFormik({
    initialValues,
    validationSchema: addFamilyMemberSchema,
    onSubmit: (values) => {
      const body = {
        FamilyModels: [...familyArr, values]
      }
      mutateAddFamilyMembers(body, {
        onSuccess: () => {
          removeLastModal()
        }
      });

    },
  });
  return (
    <BottomModalContainer
      height={'500px'}
      hasCloseButton={true}
      title={generalTexts?.add}
    >

      <form onSubmit={formik.handleSubmit} className="flex gap-y-4 pt-6 flex-col">
        <Input
          placeholder={profileText?.firstName}
          label={profileText?.firstName}
          className="flex-auto"
          labelClassName="font-normal text-sm"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
          id="FirstName"
          name="FirstName"
          value={formik.values.FirstName}
          onChange={formik?.handleChange}
          isTouched={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
          errorMessage={formik.errors.FirstName}
        />
        <Input
          placeholder={profileText?.lastName}
          label={profileText?.lastName}
          className="flex-auto"
          labelClassName="font-normal text-sm"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
          id="LastName"
          name="LastName"
          value={formik.values.LastName}
          onChange={formik?.handleChange}
          isTouched={formik.touched.LastName && Boolean(formik.errors.LastName)}
          errorMessage={formik.errors.LastName}
        />
        <Input
          placeholder={profileText?.nationalCode}
          label={profileText?.nationalCode}
          className="flex-auto"
          labelClassName="font-normal text-sm"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
          id="NationlaCode"
          name="NationlaCode"
          type="string"
          value={formik.values.NationlaCode}
          onChange={formik?.handleChange}
          isTouched={formik.touched.NationlaCode && Boolean(formik.errors.NationlaCode)}
          errorMessage={formik.errors.NationlaCode}
        />
        <Input
          placeholder={'09123456789'}
          label={generalTexts?.phoneNumber}
          className="flex-auto"
          labelClassName="font-normal text-sm"
          inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
          id="PhoneNumber"
          name="PhoneNumber"
          type="strin"
          value={formik.values.PhoneNumber}
          onChange={formik?.handleChange}
          isTouched={formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)}
          errorMessage={formik.errors.PhoneNumber}
        />
        <Button type="submit" className='w-full mt-3' size='large' buttonType='contained' variant={'primary'}>{generalTexts?.register}</Button>

      </form>
    </BottomModalContainer>
  );
}
