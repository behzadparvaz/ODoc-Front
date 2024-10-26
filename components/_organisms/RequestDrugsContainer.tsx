import { useState } from 'react';
import AddNewRequestDrugForm from './AddNewRequestDrugForm';
import { Button } from '@com/_atoms/NewButton';
import { NewPlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { Formik, Form, Field, FieldArray } from 'formik';
import { RequestDrugSchema } from '@utilities/validationSchemas';
import { useDispatch } from 'react-redux';
import { setDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { useRouter } from 'next/router';

interface DrugShape {
  name: string;
  id: number;
}
interface DrugForm {
  id: number;
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
}

const RequestDrugsContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lastId, setLastId] = useState(0);
  const initialValues: DrugForm[] = [
    {
      id: lastId,
      quantity: '',
      drugName: '',
      drugShape: null,
    },
  ];

  return (
    <Formik
      initialValues={{ drugs: initialValues }}
      validationSchema={RequestDrugSchema}
      onSubmit={(values) => {
        console.log(values);
        dispatch(setDrugsStateAction(values.drugs));
        router.push('/app/quick-order');
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <FieldArray name="drugs">
            {({ push, remove }) => (
              <>
                {values.drugs.map((item, index) => (
                  <AddNewRequestDrugForm
                    key={index}
                    index={index}
                    handleDelete={() => remove(index)}
                    data={item}
                    totalDrugs={values.drugs.length}
                  />
                ))}
                <div className="flex justify-between items-center mt-4">
                  <div
                    className={`flex items-center gap-2 font-medium ${
                      !isValid ||
                      !values.drugs.every(
                        (drug) =>
                          drug.drugName &&
                          drug.quantity !== null &&
                          drug.drugShape,
                      )
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => {
                      // Check if all previous fields are valid before adding a new one
                      const allFieldsValid = values.drugs.every(
                        (drug) =>
                          drug.drugName &&
                          drug.quantity !== null &&
                          drug.drugShape,
                      );
                      if (allFieldsValid) {
                        setLastId((prevId) => prevId + 1);
                        push({
                          id: lastId + 1,
                          quantity: null,
                          drugName: '',
                          drugShape: null,
                        });
                      }
                    }}
                  >
                    <NewPlusIconOutline
                      width={20}
                      height={20}
                      fill={colors.black}
                    />
                    <span className="mt-1">اضافه کردن دارو</span>
                  </div>
                  <Button
                    variant="primary"
                    size="medium"
                    type="submit"
                    disabled={
                      !isValid ||
                      !values.drugs.every(
                        (drug) =>
                          drug.drugName &&
                          drug.quantity !== null &&
                          drug.drugShape,
                      )
                    }
                  >
                    تأیید و ادامه
                  </Button>
                </div>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default RequestDrugsContainer;
