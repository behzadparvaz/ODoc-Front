import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Field, useFormikContext } from 'formik';

import { TextInput as Input } from '@com/_atoms/NewTextInput';
import { ChevronDownIcon, NewDeleteIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import DrugShapes from './DrugShapes';
import { TextAreaInput } from '@com/_atoms/NewTextArea';

interface DrugShape {
  name: string;
  id: number;
}

interface DrugForm {
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
  description: string;
}

interface FormValues {
  drugs: DrugForm[];
}

interface AddNewRequestDrugFormProps {
  handleDelete: () => void;
  index: number;
  data: DrugForm;
  totalDrugs: number;
}

const AddNewRequestDrugForm = ({
  handleDelete,
  index,
  data,
  totalDrugs,
}: AddNewRequestDrugFormProps) => {
  const { query } = useRouter();
  const { setFieldValue, values } = useFormikContext<FormValues>(); // Specify the type here

  const { addModal } = useModal();

  const deleteDrug = () => {
    if (totalDrugs === 1) {
      // Clear input values if it's the last item
      setFieldValue(`drugs.${index}.drugName`, '');
      setFieldValue(`drugs.${index}.quantity`, '');
      setFieldValue(`drugs.${index}.drugShape`, null);
      setFieldValue(`drugs.${index}.discription`, '');
    } else {
      handleDelete(); // Otherwise, just delete the item
    }
  };

  // Determine if delete icon should be enabled
  const isDeleteEnabled = Boolean(
    values.drugs[index].drugName ||
      values.drugs[index].quantity ||
      values.drugs[index].drugShape ||
      values.drugs[index].description,
  );

  useEffect(() => {
    if (query.searchText) {
      setFieldValue(`drugs.0.drugName`, query.searchText);
    }
  }, []);

  return (
    <>
      {index !== 0 && (
        <div className="my-2 min-h-[1px] bg-gray-200 w-full"></div>
      )}
      <div className="mb-2 flex justify-between items-center">
        <h1>درخواست {index + 1}</h1>
        <div
          onClick={isDeleteEnabled || totalDrugs >= 1 ? deleteDrug : undefined}
        >
          <NewDeleteIcon
            width={24}
            height={24}
            fill={
              isDeleteEnabled || totalDrugs > 1
                ? colors.red[400]
                : colors.grey[400]
            }
          />
        </div>
      </div>
      <div className={`w-full`}>
        <Field name={`drugs.${index}.drugName`}>
          {({ field }: any) => (
            <div>
              <Input
                {...field}
                placeholder="نام دارو را بنویسید (مثال استامینوفن 500)"
              />
            </div>
          )}
        </Field>
        <div className="flex gap-x-2 mt-2">
          <div className="flex-1">
            <div
              onClick={() =>
                addModal({
                  modal: DrugShapes,
                  props: {
                    handleClick: (item) => {
                      setFieldValue(`drugs.${index}.drugShape`, item);
                    },
                  },
                })
              }
              className={`bg-gray-100 flex justify-between items-center cursor-pointer px-3 rounded-md h-10 text-sm`}
            >
              {data?.drugShape?.name ? (
                data?.drugShape?.name
              ) : (
                <span className="text-gray-400 text-2xs">نوع دارو</span>
              )}
              <ChevronDownIcon width={20} height={20} stroke={colors.black} />
            </div>
          </div>
          <Field name={`drugs.${index}.quantity`}>
            {({ field }: any) => (
              <div className="flex-1">
                <Input
                  {...field}
                  labelClassName="text-sm font-medium"
                  type="number"
                  placeholder="تعداد دارو (حداکثر 100 عدد)"
                  onChange={(e) => {
                    const value =
                      Number(e.target.value) === 0
                        ? ''
                        : `${Math.min(Number(e.target.value), 100)}`;
                    setFieldValue(`drugs.${index}.quantity`, value);
                  }}
                />
              </div>
            )}
          </Field>
        </div>
        <div className="mt-2 flex">
          <Field name={`drugs.${index}.description`}>
            {({ field }) => (
              <TextAreaInput
                {...field}
                inputClassName="rounded-md"
                placeholder="توضیحات خود را برای دارو درخواستی بنویسید"
                rows={3}
              />
            )}
          </Field>
        </div>
      </div>
    </>
  );
};

export default AddNewRequestDrugForm;
