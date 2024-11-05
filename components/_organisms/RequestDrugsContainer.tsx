import { Button } from '@com/_atoms/NewButton';
import { NewPlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { setDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { RequestDrugSchema } from '@utilities/validationSchemas';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewRequestDrugForm from './AddNewRequestDrugForm';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

interface DrugShape {
  name: string;
  id: number;
}

interface DrugForm {
  id: string; // Change to string for UUID
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
}

const RequestDrugsContainer = () => {
  const initialValues: DrugForm[] = [
    {
      id: uuidv4(), // Use uuidv4 for initial ID
      quantity: '',
      drugName: '',
      drugShape: null,
    },
  ];

  const drugs = useSelector((state: any) => state.requestDrugs.drugs);
  const [formikValues, setFormikValues] = useState(initialValues);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormikValues(drugs.length > 0 ? drugs : initialValues); // Ensure it defaults to initial if empty
  }, [drugs]);
  return (
    <Formik
      initialValues={{ drugs: formikValues }}
      enableReinitialize
      validationSchema={RequestDrugSchema}
      onSubmit={(values) => {
        dispatch(setDrugsStateAction(values.drugs));
        router.push('/app/request-drugs/confirm-request-drugs');
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <FieldArray name="drugs">
            {({ push, remove }) => (
              <>
                {values.drugs.map((item, index) => (
                  <AddNewRequestDrugForm
                    key={item.id} // Use UUID as key
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
                      const allFieldsValid = values.drugs.every(
                        (drug) =>
                          drug.drugName &&
                          drug.quantity !== null &&
                          drug.drugShape,
                      );
                      if (allFieldsValid) {
                        push({
                          id: uuidv4(), // Use uuidv4 for new ID
                          quantity: '',
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
