import { useAddProductToBasket } from '@api/basket/basketApis.rq';
import { useGetProfile } from '@api/user/user.rq';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { TextInput as Input } from '@com/_atoms/NewTextInput';
import { ClipboardClockIcon, NewDeleteIcon } from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import useNotification from '@hooks/useNotification';
import { removeDrugAction } from '@redux/requestDrugs/requestDrugsActions';
import { routeList } from '@routes/routeList';
import isValidIranianNationalCode from '@utilities/isValidIranianNationalCode';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface Drug {
  id: string;
  drugName: string;
  quantity: number;
  description: string;
  drugShape?: {
    unit?: string;
    name?: string;
  };
}

interface FormValues {
  description: string;
  nationalCode: string;
}

const ConfirmRequestDrugs = () => {
  const validationSchema = Yup.object().shape({
    nationalCode: Yup.string()
      .required('کد ملی الزامی می باشد')
      .min(10, 'کد ملی وارد شده صحیح نمی‌باشد')
      .max(10, 'کد ملی وارد شده صحیح نمی‌باشد')
      .matches(/^\d+$/, 'کد ملی باید فقط شامل اعداد باشد')
      .test(
        'is-valid-national-code',
        'کد ملی وارد شده صحیح نمی‌باشد',
        (value) => isValidIranianNationalCode(value),
      ),
  });
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const { data, isLoading: profileDataLoading } = useGetProfile({
    enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const drugs = useSelector((state: any) => state.requestDrugs.drugs);
  const { mutate: addToCart, isPending } = useAddProductToBasket();
  const { openNotification } = useNotification();

  const initialValues: FormValues = {
    description: '',

    nationalCode: data?.queryResult?.[0]?.nationalCode || '',
  };

  useEffect(() => {
    if (!loading && (!drugs || drugs.length === 0)) {
      replace('/app/otc-medicine');
    }
    setLoading(false);
  }, [drugs, loading, replace]);

  const handleDeleteDrug = (drugId: string) => {
    dispatch(removeDrugAction(drugId));
  };

  const handleSendForm = (values: any): any => {
    if (!values.nationalCode) {
      return openNotification({
        type: 'error',
        message: 'کد ملی اجباری است',
        notifType: 'successOrFailedMessage',
      });
    }

    const serializeData = (drugs: Drug[]): any => {
      const body = {
        description: values.description,
        requestOrders: drugs.map((item) => ({
          irc: item.id,
          productName: item.drugName,
          quantity: item.quantity,
          unit: item.drugShape?.unit === '_' ? null : item.drugShape?.unit,
          description: item?.description,
        })),
      };
      return body;
    };

    addToCart(serializeData(drugs), {
      onSuccess: () => {
        replace(routeList.basket);
      },
    });
  };

  return (
    <MainLayout
      title="تایید ثبت درخواست دارو"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSendForm}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="flex justify-center flex-col mb-24">
            <div className="flex flex-col px-4">
              <h1 className="font-bold text-base mt-4">اقلام درخواست</h1>
              <div className="mt-5 mb-5">
                {drugs.length > 0 ? (
                  drugs.map((item, index) => (
                    <div
                      className="flex justify-between items-center gap-6"
                      key={index}
                    >
                      <div className="min-w-[32px] min-h-[32px] flex justify-center items-center bg-gray-200 rounded-full">
                        <ClipboardClockIcon
                          width={20}
                          height={20}
                          fill={colors.grey[600]}
                        />
                      </div>
                      <div className="w-full overflow-hidden truncate">
                        <span className="text-md font-medium">
                          {item.drugName}
                        </span>
                        <div className="text-xs font-light text-grey-500 flex">
                          <span>نوع دارو:</span>
                          <span>{item.drugShape?.name}</span>
                        </div>
                        <div className="text-xs font-light text-grey-500 flex">
                          <span>تعداد درخواست:</span>
                          <span>{item.quantity}</span>
                        </div>
                        {item.description && (
                          <div className="text-xs font-light text-grey-500 flex truncate">
                            <span>توضیحات:</span>
                            <span className="overflow-hidden truncate">
                              {item.description}
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => handleDeleteDrug(item.id)}
                        className="w-[72px] h-[72px] flex justify-center items-center cursor-pointer"
                      >
                        <NewDeleteIcon
                          width={24}
                          height={24}
                          fill={colors.red[400]}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    هیچ دارویی برای نمایش وجود ندارد.
                  </p>
                )}
              </div>
              <div className="h-[1px] bg-grey-200 w-full mb-2" />
            </div>
            <div className="w-full px-4">
              <Field name="description">
                {({ field }) => (
                  <TextAreaInput
                    {...field}
                    labelClassName="text-sm font-medium"
                    inputClassName="rounded-md"
                    label="توضیحات سفارش"
                    placeholder="سن، جنسیت، حساسیت دارویی و توضیحات سفارش خود را برای داروخانه بنویسید"
                    rows={5}
                  />
                )}
              </Field>
              <Field name="nationalCode">
                {({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="کد ملی"
                    placeholder="1234567890"
                    className="mt-4"
                    id="nationalCode"
                    isTouched={
                      touched.nationalCode && Boolean(errors.nationalCode)
                    }
                    errorMessage={errors.nationalCode}
                    maxLength={10}
                    disabled={profileDataLoading}
                  />
                )}
              </Field>
            </div>
            <ActionBar type="singleAction" hasDivider>
              <Button
                className="w-full"
                variant="primary"
                size="large"
                type="submit"
                isLoading={isPending || profileDataLoading}
                disabled={isPending || profileDataLoading}
              >
                افزودن به سبد خرید
              </Button>
            </ActionBar>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default ConfirmRequestDrugs;
