import { useCreateOrderInsurance } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import CheckBox from '@com/_atoms/CheckBox.nd';
import { TickIcon } from '@com/icons';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import React from 'react';

type Props = {
  data: any;
  handleSelectFamilyMember: (item: any) => void;
};

export default function SeeAllFamilyMembersBottomSheet({
  data,
  handleSelectFamilyMember,
}: Props) {
  const { removeLastModal } = useModal();
  const { mutate: mutateCreateOrderInsurance } = useCreateOrderInsurance();
  const handleRegisterOrder = () => {
    mutateCreateOrderInsurance(data);
    removeLastModal();
  };

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={true}
      className="!overflow-hidden"
      title={orderText?.familyMembers}
    >
      {data?.map((item, index) => {
        return (
          <div key={index} className="mt-3">
            <CheckBox
              handleChange={() => {}}
              onClick={() => {
                handleSelectFamilyMember(item);
                removeLastModal();
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
              // checked={
              //   (selectFamilyPerson && familyMembers?.length === 1) ||
              //   selectedReceiver?.customerName ===
              //     `${item?.fisrtname} ${item?.lastName}`
              // }
              className="w-full mt-3"
              value={`${item?.fisrtname} ${item?.lastName}`}
            />
          </div>
        );
      })}
    </BottomModalContainer>
  );
}
