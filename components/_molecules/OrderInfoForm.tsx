import {
  useGetInsurances,
  useGetSupplementaryInsurances,
} from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import Input from '@com/_atoms/Input.nd';
import { SearchIconOutline, TickIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import { OrderRegistrationSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Profile } from '@utilities/interfaces/user';
import useNotification from '@hooks/useNotification';
import FixBottomSection from '@com/_atoms/FixBottomSection';
import { useGetVendors } from '@api/vendor/vendor.rq';
import Accordion from './Accordion';
import { useRouter } from 'next/router';
interface Props {
  submitForm?: (value) => void;
  userInfo: Profile;
}

const OrderInfoForm = ({ submitForm, userInfo }: Props) => {
  const { query } = useRouter();
  const { data: insurances } = useGetInsurances();
  const { data: supplementaryInsurances } = useGetSupplementaryInsurances();
  const { data: vendors } = useGetVendors();
  const { openNotification } = useNotification();
  const [searchedInsuranceQuery, setSearchedInsuranceQuery] = useState('');
  const isSpecialPatient = query?.type === 'SP';
  const filteredInsurances = supplementaryInsurances?.filter((item) =>
    item?.name?.toLowerCase()?.includes(searchedInsuranceQuery?.toLowerCase()),
  );

  const [initialValues] = useState({
    refrenceNumber: '',
    nationalCode: userInfo?.nationalCode,
    phoneNumber: userInfo?.phoneNumber,
    insuranceTypeId: '',
    supplementaryInsuranceType: 0,
    isSpecialPatient: false,
    vendorCode: '',
  });

  const formik = useFormik({
    initialValues,
    validationSchema: OrderRegistrationSchema,
    onSubmit: (value) => {
      const body = {
        refrenceNumber: value?.refrenceNumber,
        nationalCode: value?.nationalCode,
        phoneNumber: value?.phoneNumber,
        insuranceTypeId: Number(value?.insuranceTypeId),
        supplementaryInsuranceType: isSpecialPatient
          ? Number(value?.supplementaryInsuranceType)
          : null,
        isSpecialPatient: isSpecialPatient,
        vendorCode: isSpecialPatient ? value?.vendorCode : '',
      };

      if (!value?.nationalCode) {
        openNotification({
          type: 'error',
          message: 'صاحب نسخه را مشخص کنید',
          notifType: 'successOrFailedMessage',
        });
      } else if (isSpecialPatient && !value?.vendorCode) {
        openNotification({
          type: 'error',
          message: 'لطفا داروخانه را مشخص کنید',
          notifType: 'successOrFailedMessage',
        });
      } else {
        submitForm(body);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Input
        required
        type="number"
        label={orderText?.nationalCode}
        placeholder={orderText?.nationalCode}
        className="flex-auto"
        labelClassName="font-semibold text-sm mt-6"
        inputClassName="placeholder-grey-400 bg-grey-50 text-grey-600 text-sm px-4 custom-input"
        id="nationalCode"
        name="nationalCode"
        value={formik.values.nationalCode}
        onChange={formik.handleChange}
        isTouched={
          formik.touched.nationalCode && Boolean(formik.errors.nationalCode)
        }
        errorMessage={formik.errors.nationalCode}
        maxLength={10}
      />

      <Input
        required
        type="number"
        placeholder={orderText?.referenceNumber}
        label={orderText?.referenceNumber}
        className="flex-auto mt-5"
        labelClassName="font-semibold text-sm mt-6"
        inputClassName="placeholder-grey-400 bg-grey-50 text-grey-600 text-sm px-4 custom-input"
        id="refrenceNumber"
        name="refrenceNumber"
        value={formik.values.refrenceNumber}
        onChange={formik.handleChange}
        isTouched={
          formik.touched.refrenceNumber && Boolean(formik.errors.refrenceNumber)
        }
        errorMessage={formik.errors.refrenceNumber}
      />

      <Input
        type="text"
        placeholder={orderText?.enterPhoneNumber}
        label={orderText?.phoneNumber}
        className="flex-auto"
        labelClassName="font-semibold text-sm mt-6"
        inputClassName="placeholder-grey-300 bg-grey-200 text-grey-600 text-sm px-4 custom-input mb-6"
        id="phoneNumber"
        name="phoneNumber"
        disabled
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
      />
      <Accordion
        header={
          <label className="font-semibold text-sm text-gray-800 block">
            {orderText?.insuranceType}
          </label>
        }
        content={insurances?.map((item, index) => (
          <div key={item?.name} className="px-2">
            <CheckBox
              handleChange={() => {
                const currentInsuranceType = formik?.values?.insuranceTypeId;
                formik.setFieldValue(
                  'insuranceTypeId',
                  currentInsuranceType === item?.id ? '' : item?.id,
                );
              }}
              label={item?.name}
              labelClassName="text-sm mr-6 font-normal text-grey-700"
              name="insuranceTypeId"
              id={item?.id}
              value={item?.id}
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
              checked={Number(formik?.values?.insuranceTypeId) === item?.id}
              className="w-full mb-4 z-0"
            />
          </div>
        ))}
      />
      {isSpecialPatient ? (
        <>
          <Accordion
            header={
              <label className="font-semibold text-sm text-gray-800 block">
                {orderText?.additionalInsuranceType}
              </label>
            }
            content={
              <>
                <div className="relative w-full">
                  <SearchIconOutline
                    className="absolute left-4 top-4 -translate-y-1/2"
                    height={16}
                    width={16}
                    fill={colors.grey[400]}
                  />
                  <input
                    type="text"
                    placeholder="بیمه تکمیلی"
                    value={searchedInsuranceQuery}
                    onChange={(e) =>
                      setSearchedInsuranceQuery(e?.target?.value)
                    }
                    className="w-full mb-4 px-2 py-1 border border-grey-100 rounded"
                  />
                </div>
                <div className="overflow-y-auto max-h-36">
                  {filteredInsurances?.map((item, index) => (
                    <div key={item?.name} className="px-2">
                      <CheckBox
                        handleChange={() => {
                          const currentInsuranceType =
                            formik?.values?.supplementaryInsuranceType;
                          formik.setFieldValue(
                            'supplementaryInsuranceType',
                            currentInsuranceType === item?.id ? '' : item?.id,
                          );
                        }}
                        label={item?.name}
                        labelClassName="text-sm mr-6 font-normal text-grey-700"
                        name="supplementaryInsuranceType"
                        id={item?.id}
                        value={item?.id}
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
                        checked={
                          Number(formik?.values?.supplementaryInsuranceType) ===
                          item?.id
                        }
                        className="w-full mb-4 z-0"
                      />
                    </div>
                  ))}
                </div>

                {filteredInsurances?.length === 0 && (
                  <p className="text-gray-500 text-sm">بیمه‌ای یافت نشد</p>
                )}
              </>
            }
          />
          <Accordion
            header={
              <label className="font-semibold text-sm text-gray-800 block">
                {orderText?.selectDrugStore}
              </label>
            }
            content={vendors?.map((item) => (
              <div key={item.vendorCode} className="px-2">
                <CheckBox
                  handleChange={() => {
                    const currentVendorCode = formik?.values?.vendorCode;
                    formik.setFieldValue(
                      'vendorCode',
                      currentVendorCode === item?.vendorCode
                        ? ''
                        : item?.vendorCode,
                    );
                  }}
                  label={item.vendorName}
                  labelClassName="text-sm mr-6 font-normal text-grey-700"
                  name="vendorCode"
                  id={item?.vendorCode}
                  value={item?.vendorCode}
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
                  checked={formik.values.vendorCode === item?.vendorCode}
                  className="w-full mb-4 z-0"
                />
              </div>
            ))}
          />
        </>
      ) : null}

      <FixBottomSection>
        <div className="w-full flex justify-end p-4">
          <Button
            className="w-full"
            type="submit"
            buttonType="contained"
            size="large"
            variant="primary"
          >
            اضافه به سبد خرید و ادامه
          </Button>
        </div>
      </FixBottomSection>
    </form>
  );
};
export default OrderInfoForm;
