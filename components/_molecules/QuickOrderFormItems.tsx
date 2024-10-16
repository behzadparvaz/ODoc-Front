import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import DrugShapes from '@com/_organisms/DrugShapes';
import { ChevronDownIcon, TrushIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { useState } from 'react';

interface FeildProps {
  feildName: string;
  val: string | number;
}

interface Props {
  handelChange: (feild: FeildProps) => void;
  handleDeleteItem: () => void;
  showDeleteButton?: boolean;
  className?: string;
  data: any;
}

const QuickOrderFormItems = ({
  handelChange,
  handleDeleteItem,
  showDeleteButton = true,
  className = '',
  data,
}: Props) => {
  const { addModal } = useModal();
  const [drugTypeLabel, setDrugTypeLabel] = useState<string>('');
  const handleClickItem = (item) => {
    setDrugTypeLabel(item?.name);
    handelChange({ feildName: 'drugType', val: item?.id });
    handelChange({ feildName: 'drugLabel', val: item?.name });
  };
  return (
    <div className={` ${className} w-full px-4`}>
      <Input
        onChange={(e) => {
          handelChange({ feildName: 'drugName', val: e?.target?.value });
        }}
        value={data?.drugName}
        className="mb-6"
        labelClassName="text-base font-medium"
        label="نام دارو"
        inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
        placeholder="نام دارو را بنویسید"
      />
      <div className="flex gap-x-4">
        <div className="flex-1">
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
            className={`bg-gray-100 flex justify-between items-center cursor-pointer px-3 ${drugTypeLabel ? 'text-black' : 'text-gray-400'} rounded-md h-[52px]`}
          >
            {data
              ? data?.drugLabel
              : drugTypeLabel
                ? drugTypeLabel
                : 'نوع دارو'}

            <ChevronDownIcon width={20} height={20} stroke="black" />
          </div>
        </div>
        <div className="flex-1">
          <Input
            onChange={(e) => {
              handelChange({ feildName: 'drugCount', val: e?.target?.value });
            }}
            labelClassName="text-base font-medium"
            label="تعداد دارو"
            type="number"
            value={data?.drugCount}
            inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
            placeholder="تعداد دارو"
          />
        </div>
      </div>
      {showDeleteButton && (
        <div className="flex justify-end mt-3">
          <Button
            handleClick={() => {
              // setShowForm(false);
              handleDeleteItem();
            }}
            iconDirection="right"
            icon={<TrushIcon width={24} height={24} fill={colors?.gray[400]} />}
            size="large"
            className="gap-x-1 text-gray-400 bg-gray-50"
          >
            حذف
          </Button>
        </div>
      )}
    </div>
  );
};
export default QuickOrderFormItems;
