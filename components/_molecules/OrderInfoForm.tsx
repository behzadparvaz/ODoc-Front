import { useGetInsurances } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import Input from '@com/_atoms/Input.nd';
import { TickIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import { OrderRegistrationSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { Profile } from '@utilities/interfaces/user';
import useNotification from '@hooks/useNotification';
import Select from '@com/_atoms/Select';

interface Props {
  handleNextStep?: (step, value) => void;
  userInfo: Profile;
}

const OrderInfoForm = ({ handleNextStep, userInfo }: Props) => {
  const { data: insurances } = useGetInsurances();
  const { openNotification } = useNotification();
  const familyMembers = userInfo?.familyMembers;

  const optionsForCustomer = useMemo(() => {
    const customerList = [{ ...userInfo, relation: 'خودم' }];
    if (familyMembers.length > 0) {
      familyMembers.forEach((item: any) =>
        !customerList.map(customer => customer.nationalCode).includes(item.nationalCode)
        && customerList.push({ ...item, firstName: item.fisrtname, relation: item?.relation?.name } as any)
      );
    }

    return customerList.map(item => ({ name: `${item?.firstName} ${item?.lastName} ${item?.relation ? `(${item?.relation})` : ''}`, id: item?.nationalCode }));
  }, [familyMembers, userInfo]);

  const [initialValues] = useState({
    referenceNumber: '',
    nationalCode: userInfo?.nationalCode,
    customerName: optionsForCustomer?.[0]?.name,
    doctorName: null,
    comment: null,
    isSpecialPatient: false,
    insuranceTypeId: 1
  });

  const formik = useFormik({
    initialValues,
    validationSchema: OrderRegistrationSchema,
    onSubmit: (value) => {
      const body = {
        referenceNumber: value?.referenceNumber,
        nationalCode: value?.nationalCode,
        customerName: optionsForCustomer.find(item => item.id === value?.nationalCode).name,
        doctorName: value?.doctorName,
        comment: value?.comment,
        isSpecialPatient: value?.isSpecialPatient,
        insuranceTypeId: Number(value?.insuranceTypeId)
      };
      if (value?.nationalCode) {
        handleNextStep(2, body);
      } else {
        openNotification({
          type: 'error',
          message: 'صاحب نسخه را مشخص کنید',
          notifType: 'successOrFailedMessage'
        });
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Select options={optionsForCustomer}
        selectClassName='px-4'
        className='pb-4'
        name="nationalCode"
        label="صاحب نسخه"
        labelClassName="font-semibold text-sm"
        onChange={formik.handleChange}
        value={formik.values.nationalCode}/>

      <Input
        required
        type="number"
        placeholder={orderText?.enterReferenceNumber}
        label={orderText?.referenceNumber}
        className="flex-auto"
        labelClassName="font-semibold text-sm"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
        id="referenceNumber"
        name="referenceNumber"
        value={formik.values.referenceNumber}
        onChange={formik.handleChange}
        isTouched={formik.touched.referenceNumber && Boolean(formik.errors.referenceNumber)}
        errorMessage={formik.errors.referenceNumber}
      />
      <Input
        type="text"
        placeholder={orderText?.enterDoctorName}
        label={orderText?.doctorName}
        className="flex-auto"
        labelClassName="font-semibold text-sm mt-5"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input mb-5"
        id="doctorName"
        name="doctorName"
        value={formik.values.doctorName}
        onChange={formik.handleChange}
      />
      <label className="font-semibold text-sm mb-2 text-gray-800">
        {orderText?.insuranceType}
      </label>
      <select
        name="insuranceTypeId"
        value={formik?.values?.insuranceTypeId}
        className="w-full h-10 rounded-md outline-none placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 mb-5"
        onChange={formik.handleChange}
      >
        {insurances?.map((item, index) => {
          return (
            <>
              <option value={item?.id} key={index} selected={index === 0}>
                {item?.name}
              </option>
            </>
          );
        })}
      </select>
      <label className="font-semibold text-sm mb-2 text-gray-800">
        {orderText?.description}
      </label>
      <textarea
        placeholder={orderText?.description}
        className="block p-2.5 w-full resize-none h-20 text-sm border border-grey-300 text-grey-600 rounded-md outline-none"
        id="comment"
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
      />

      <div>
        <CheckBox
          handleChange={formik.handleChange}
          onClick={() => {
          }}
          label="نسخه بیماری خاص"
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

      <div className="w-full flex justify-end mt-10">
        <Button
          type="submit"
          buttonType="contained"
          size="large"
          variant="primary"
        >
          ادامه
        </Button>
      </div>
    </form>
  );
};
export default OrderInfoForm;
