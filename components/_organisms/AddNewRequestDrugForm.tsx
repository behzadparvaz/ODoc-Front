import Input from '@com/_atoms/Input.nd';
import { ChevronDownIcon, NewDeleteIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import DrugShapes from './DrugShapes';
import { Field, useFormikContext } from 'formik';

interface DrugShape {
  name: string;
  id: number;
}

interface DrugForm {
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
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
  const { setFieldValue, values } = useFormikContext<FormValues>(); // Specify the type here

  const { addModal } = useModal();

  const deleteDrug = () => {
    if (totalDrugs === 1) {
      // Clear input values if it's the last item
      setFieldValue(`drugs.${index}.drugName`, '');
      setFieldValue(`drugs.${index}.quantity`, '');
      setFieldValue(`drugs.${index}.drugShape`, null);
    } else {
      handleDelete(); // Otherwise, just delete the item
    }
  };

  // Determine if delete icon should be enabled
  const isDeleteEnabled = Boolean(
    values.drugs[index].drugName ||
      values.drugs[index].quantity ||
      values.drugs[index].drugShape,
  );

  return (
    <>
      {index !== 0 && (
        <div className="my-4 min-h-[1px] bg-gray-200 w-full"></div>
      )}
      <div className="mb-4 flex justify-between items-center">
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
                labelClassName="text-base font-medium"
                inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
                placeholder="نام دارو را بنویسید"
              />
            </div>
          )}
        </Field>
        <div className="flex gap-x-4 mt-4">
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
              className={`bg-gray-100 flex justify-between items-center cursor-pointer px-3 rounded-md h-[52px]`}
            >
              {data?.drugShape?.name ? (
                data?.drugShape?.name
              ) : (
                <span className="text-gray-400">نوع دارو</span>
              )}
              <ChevronDownIcon width={20} height={20} stroke={colors.black} />
            </div>
          </div>
          <Field name={`drugs.${index}.quantity`}>
            {({ field }: any) => (
              <div className="flex-1">
                <Input
                  {...field}
                  labelClassName="text-base font-medium"
                  type="number"
                  inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
                  placeholder="تعداد دارو"
                />
              </div>
            )}
          </Field>
        </div>
      </div>
    </>
  );
};

export default AddNewRequestDrugForm;
