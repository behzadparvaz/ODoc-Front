import Input from '@com/_atoms/Input.nd';
import DrugShapes from '@com/_organisms/DrugShapes';
import { ChevronDownIcon } from '@com/icons';
import useModal from '@hooks/useModal';
import { useState } from 'react';

interface FeildProps {
  feildName: string;
  val: string | number;
}

interface Props {
  handelChange: (feild: FeildProps) => void;
}

const QuickOrderFormItems = ({ handelChange }: Props) => {
  const { addModal } = useModal();
  const [drugTypeLabel, setDrugTypeLabel] = useState('');
  const handleClickItem = (item) => {
    setDrugTypeLabel(item?.name);
    handelChange({ feildName: 'drugType', val: item?.id });
  };

  return (
    <div className="w-full px-4">
      <Input
        onChange={(e) => {
          handelChange({ feildName: 'drugName', val: e?.target?.value });
        }}
        className="mb-6"
        labelClassName="text-base font-medium"
        label="نام دارو"
        inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
        placeholder="نام دارو را بنویسید"
      />
      <div className="w-full">
        <p className="text-base font-medium mb-2">نوع دارو</p>
        <div
          onClick={() =>
            addModal({
              modal: DrugShapes,
              props: {
                handleClick: (item) => handleClickItem(item),
              },
            })
          }
          className={`bg-gray-100 flex justify-between items-center cursor-pointer px-3 ${drugTypeLabel ? 'text-black' : 'text-gray-400'} rounded-md h-[52px] mb-6`}
        >
          {drugTypeLabel ? drugTypeLabel : 'نوع دارو را انتخاب کنید'}

          <ChevronDownIcon width={20} height={20} stroke="black" />
        </div>
      </div>
      <Input
        onChange={(e) => {
          handelChange({ feildName: 'drugCount', val: e?.target?.value });
        }}
        labelClassName="text-base font-medium"
        label="تعداد دارو"
        type="number"
        inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
        placeholder="تعداد دارو را بنویسید"
      />
    </div>
  );
};
export default QuickOrderFormItems;
