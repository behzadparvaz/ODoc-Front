import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  useAddProductToBasket,
  useGetCurrentBasket,
} from '@api/basket/basketApis.rq';

import { routeList } from '@routes/routeList';
import {
  useGetInsurances,
  useGetSupplementaryInsurances,
} from '@api/order/orderApis.rq';
import CheckBox from '@com/_atoms/CheckBox.nd';
import { SearchIconOutline, TickIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import { OrderRegistrationSchema } from '@utilities/validationSchemas';
import useNotification from '@hooks/useNotification';
import { useGetVendors } from '@api/vendor/vendor.rq';
import { TextInput } from '@com/_atoms/NewTextInput';
import ActionBar from '@com/Layout/ActionBar';
import Accordion from '@com/_molecules/Accordion';
import { Button } from '@com/_atoms/NewButton';

type RxRegistrationProps = {
  userInfo?: any;
};

const RxRegistration = ({ userInfo }: RxRegistrationProps) => {
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

  const router = useRouter();

  const { refetch: refetchGetBasket } = useGetCurrentBasket();
  const { mutate: addToCart, isPending: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        refetchGetBasket();
        router.push(routeList.basket);
      },
    });

  const [initialValues] = useState({
    refrenceNumber: '',
    nationalCode: userInfo?.nationalCode ?? '',
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
        orderType: 'RX',
        refrenceNumber: value?.refrenceNumber,
        nationalCode: String(value?.nationalCode),
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
      } else if (!value?.insuranceTypeId) {
        openNotification({
          type: 'error',
          message: 'لطفا بیمه پایه را انتخاب کنید',
          notifType: 'successOrFailedMessage',
        });
      } else {
        addToCart(body);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full px-4 pb-[84px]">
      <div className="flex flex-col gap-y-3">
        <TextInput
          type="number"
          label={orderText?.nationalCode}
          placeholder={orderText?.nationalCode}
          className="flex-auto"
          id="nationalCode"
          name="nationalCode"
          value={formik.values.nationalCode}
          onChange={formik.handleChange}
          isTouched={
            formik.touched.nationalCode && Boolean(formik.errors.nationalCode)
          }
          errorMessage={formik.errors.nationalCode as string}
          maxLength={10}
        />

        <TextInput
          type="number"
          placeholder={orderText?.referenceNumber}
          label={orderText?.referenceNumber}
          className="flex-auto"
          id="refrenceNumber"
          name="refrenceNumber"
          value={formik.values.refrenceNumber}
          onChange={formik.handleChange}
          isTouched={
            formik.touched.refrenceNumber &&
            Boolean(formik.errors.refrenceNumber)
          }
          errorMessage={formik.errors.refrenceNumber}
          maxLength={6}
        />
      </div>

      <Accordion
        label={orderText?.insuranceType}
        header={
          <label className="font-semibold text-xs text-gray-800 block">
            {formik.values?.insuranceTypeId
              ? insurances?.find(
                  (item) => item?.id === formik?.values?.insuranceTypeId,
                )?.name
              : orderText?.insurancePlaceholder}
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
              labelClassName="text-xs mr-6 font-normal text-grey-700"
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
            label={orderText?.additionalInsuranceType}
            header={
              <label className="font-semibold text-xs text-gray-800 block">
                {formik.values?.supplementaryInsuranceType
                  ? filteredInsurances?.find(
                      (item) =>
                        item?.id === formik?.values?.supplementaryInsuranceType,
                    )?.name
                  : orderText?.insurancePlaceholder}
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
                        labelClassName="text-xs mr-6 font-normal text-grey-700"
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
                  <p className="text-gray-500 text-xs">بیمه‌ای یافت نشد</p>
                )}
              </>
            }
          />
          <Accordion
            label={orderText?.selectDrugStore}
            header={
              <label className="font-semibold text-xs text-gray-800 block">
                {formik.values?.vendorCode
                  ? vendors?.find(
                      (item) => item?.vendorCode === formik?.values?.vendorCode,
                    )?.vendorName
                  : orderText?.drugStorePlaceholder}
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
                  labelClassName="text-xs mr-6 font-normal text-grey-700"
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

      <ActionBar type="singleAction">
        <Button
          className="w-full"
          type="submit"
          size="large"
          variant="primary"
          isLoading={isAddingToCart}
        >
          اضافه به سبد خرید و ادامه
        </Button>
      </ActionBar>
    </form>
  );
};

export default RxRegistration;
