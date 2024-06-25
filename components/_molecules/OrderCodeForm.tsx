import { useGetInsurances } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import Input from '@com/_atoms/Input.nd';
import AddFamilyMembers from '@com/_organisms/AddFamilyMembers';
import SeeAllFamilyMembersBottomSheet from '@com/_organisms/SeeAllFamilyMembersBottomSheet';
import { TickIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { OrderCodeSchema } from '@utilities/validationSchemas';
import { useFormik } from 'formik';
import { useState } from 'react';

interface Props {
  handleNextStep?: (step, value) => void;
  userInfo: any;
}

const OrderCodeForm = ({ handleNextStep, userInfo }: Props) => {
  const { addModal } = useModal();
  const { data: insurances } = useGetInsurances();
  const [selectFamilyPerson, setSelectFamilyPerson] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<boolean>(false);
  const familyMembers = userInfo?.familyMembers;
  const [initialValues] = useState({
    orderCode: '',
    nationalCode: 0,
    customerName: '',
    doctorName: '',
    comment: '',
    insuranceTypeId: 0,
  });
  const [selectedReceiver, setSelectedReceiver] = useState({
    nationalCode: 0,
    customerName: '',
  });
  const handleSelectFamilyMember = (item) => {
    setSelectFamilyPerson(true);
    setSelectUser(false);
    setSelectedReceiver({
      nationalCode: item?.nationalCode,
      customerName: `${item?.fisrtname} ${item?.lastName}`,
    });
  };

  const handleClickOnSeeMore = () => {
    addModal({
      modal: SeeAllFamilyMembersBottomSheet,
      props: {
        data: familyMembers,
        handleSelectFamilyMember
      },
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema: OrderCodeSchema,
    onSubmit: (value) => {
      const body = {
        orderCode: value?.orderCode,
        nationalCode: selectedReceiver?.nationalCode,
        customerName: selectedReceiver?.customerName,
        doctorName: value?.doctorName,
        comment: value?.comment,
        insuranceTypeId: Number(value?.insuranceTypeId),
      };
      handleNextStep(2, body);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Input
        type="number"
        placeholder={orderText?.enterOrderCode}
        label={orderText?.orderCode}
        className="flex-auto"
        labelClassName="font-semibold text-sm"
        inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
        id="orderCode"
        name="orderCode"
        value={formik.values.orderCode}
        onChange={formik.handleChange}
        isTouched={formik.touched.orderCode && Boolean(formik.errors.orderCode)}
        errorMessage={formik.errors.orderCode}
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
        required
        value={formik?.values?.insuranceTypeId}
        className="w-full h-10 rounded-md outline-none placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 mb-5"
        onChange={formik.handleChange}
      >
        {insurances?.map((item, index) => {
          return (
            <>
              <option value={item?.id} key={index} selected>
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
        className="block p-2.5 w-full text-sm border border-grey-300 text-grey-600 rounded-md outline-none"
        id="comment"
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
      />
      <p className="text-grey-800 font-semibold text-sm mt-4">تحویل گیرنده</p>
      <div
        className={`flex flex-col border rounded-xl p-4 mt-3 ${selectUser ? 'border-teal-600' : 'border-grey-100'}`}
        onClick={() => {
          setSelectFamilyPerson(false), setSelectUser(true);
        }}
      >
        <p className="text-base text-grey-800 border-b border-grey-100 pr-2 pb-3">
          سفارش برای خودم
        </p>
        <CheckBox
          handleChange={formik.handleChange}
          onClick={() => {
            setSelectFamilyPerson(false),
              setSelectUser(true),
              setSelectedReceiver({
                nationalCode: userInfo?.nationalCode,
                customerName: `${userInfo?.firstName} ${userInfo?.lastName}`,
              });
          }}
          label={`${userInfo?.firstName} ${userInfo?.lastName}`}
          labelClassName="typo-body-6 mr-6 font-normal text-grey-700"
          name="customerName"
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
          checked={selectUser}
          className="w-full mt-3 z-0"
          value={`${userInfo?.firstName} ${userInfo?.lastName}`}
        />
      </div>
      <div
        className={`flex flex-col border rounded-xl p-4 mt-3  ${selectFamilyPerson ? 'border-teal-600' : 'border-grey-100'}`}
        onClick={() => {
          setSelectFamilyPerson(true), setSelectUser(false);
        }}
      >
        <div className="flex justify-between items-center border-b border-grey-100 pr-2 pb-3">
          <p className="text-base text-grey-800">سفارش برای افراد تحت تکفل</p>
          <Button
            size="small"
            handleClick={() =>
              addModal({
                modal: AddFamilyMembers,
                props: {
                  data: userInfo?.familyMembers,
                },
              })
            }
            variant="primary"
            className="text-xs"
          >
            افزودن
          </Button>
        </div>
        {familyMembers?.slice(0, 4)?.map((item, index) => {
          return (
            <div key={index}>
              <CheckBox
                handleChange={formik.handleChange}
                onClick={() => {
                  setSelectFamilyPerson(true),
                    setSelectUser(false),
                    setSelectedReceiver({
                      nationalCode: item?.nationalCode,
                      customerName: `${item?.fisrtname} ${item?.lastName}`,
                    });
                }}
                label={`${item?.fisrtname} ${item?.lastName}`}
                labelClassName="typo-body-6 mr-6 font-normal text-grey-700"
                name="customerName"
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
                  (selectFamilyPerson && familyMembers?.length === 1) ||
                  selectedReceiver?.customerName ===
                    `${item?.fisrtname} ${item?.lastName}`
                }
                className="w-full mt-3 z-0"
                value={`${item?.fisrtname} ${item?.lastName}`}
              />
            </div>
          );
        })}
        <p
          className="text-sm text-grey-500 mx-auto"
          onClick={() => handleClickOnSeeMore()}
        >
          نمایش بیشتر
        </p>
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
export default OrderCodeForm;
