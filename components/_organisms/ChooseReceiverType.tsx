import { useCreateOrderInsurance } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import OrderCodeForm from '@com/_molecules/OrderCodeForm';
import UserInfoForm from '@com/_molecules/UserInfoForm';
import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import React, { useState } from 'react';

type Props = {
  userInfo: any;
  initialState: any;
};

export default function ChooseReceiverType({ userInfo, initialState }: Props) {
  const [selectFamilyPerson, setSelectFamilyPerson] = useState<boolean>(false);
  const [familyPersonInfo, setFamilyPersonInfo] = useState({
    nationalCode: 0,
    customerName: '',
  });
  const familyMembers = userInfo?.familyMembers?.[0];
  const { mutate: mutateCreateOrderInsurance } = useCreateOrderInsurance();

  const handleRegisterOrder = (personalValue) => {
    const body = {
      ...initialState,
      nationalCode: selectFamilyPerson
        ? familyPersonInfo?.customerName
        : personalValue?.nationalCode,
      customerName: selectFamilyPerson
        ? familyPersonInfo?.customerName
        : `${personalValue?.firstName} ${personalValue?.lastName}`,
    };
    mutateCreateOrderInsurance(body);
  };
  const handleClickOnFamilyPerson = (familyMemberData) => {
    setFamilyPersonInfo({
      nationalCode: familyMemberData?.nationalCode,
      customerName: `${familyMemberData?.fisrtname} ${familyMemberData?.lastName}`,
    });
  };

  return (
    <div className="flex flex-col cursor-pointer select-none mr-5">
      <div
        onClick={() => setSelectFamilyPerson(false)}
        className={`bg-white rounded-xl mt-4 p-4 mb-1 border select-none ${selectFamilyPerson ? 'border-grey-100 flex items-center' : 'border-teal-600'} `}
      >
        <div
          className={`w-full ${selectFamilyPerson ? '' : 'border-b border-grey-100 pb-4'}`}
        >
          <p className="typo-body-6 text-grey-800 pr-2">سفارش برای خودم</p>
        </div>
        <div className={`flex flex-col mr-1 pt-4`}>
          <UserInfoForm
            handleRegisterOrder={(value) => {
              handleRegisterOrder(value);
            }}
            inOrderPage={true}
            data={userInfo}
            className={`${selectFamilyPerson ? 'hidden' : 'block'}`}
          />
        </div>
      </div>
      {userInfo?.familyMembers?.length && (
        <div
          onClick={() => setSelectFamilyPerson(true)}
          className={`bg-white rounded-xl p-4 mt-4 mb-1 border select-none ${selectFamilyPerson ? 'border-teal-600' : 'border-grey-100'}`}
        >
          <div className="w-full border-b border-grey-100 pb-4">
            <div className="flex items-center">
              <div className="flex flex-col pr-2">
                <p className="typo-body-6 text-grey-800">
                  سفارش برای افراد تحت تکفل
                </p>
              </div>
            </div>
          </div>
          {/* {userInfo?.familyMembers?.map((item) => { */}
          <div className="flex flex-col mr-1 pt-4">
            <div className={`flex justify-between `}>
              <CheckBox
                handleChange={(e) => {
                  handleClickOnFamilyPerson(familyMembers);
                }}
                label={`${familyMembers?.fisrtname} ${familyMembers?.lastName}`}
                labelClassName="typo-body-6 mr-[30px] font-semibold text-grey-700"
                icon={
                  <TickIcon
                    width={15}
                    height={15}
                    stroke={colors.white}
                    className="mx-auto mt-[1px]"
                  />
                }
                checkedClassName="!bg-grey-500"
                boxClassName="w-5 h-5 rounded-full border-grey-800"
                checked={selectFamilyPerson}
                className="w-full"
              />
            </div>
          </div>
          {/* })} */}
        </div>
      )}
      <Button
        size="large"
        buttonType="contained"
        handleClick={() => handleRegisterOrder(userInfo)}
        variant={'primary'}
        className="mt-5"
      >
        ثبت سفارش
      </Button>
    </div>
  );
}