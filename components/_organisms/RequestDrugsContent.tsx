import { Button } from '@com/_atoms/NewButton';
import { NewPlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { setDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { RequestDrugSchema } from '@utilities/validationSchemas';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import AddNewRequestDrugForm from './AddNewRequestDrugForm';

interface DrugShape {
  name: string;
  id: number;
}

interface DrugForm {
  id: string; // Change to string for UUID
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
  description: string;
}

const RequestDrugsContent = () => {
  const initialValues: DrugForm[] = [
    {
      id: uuidv4(), // Use uuidv4 for initial ID
      quantity: '',
      drugName: '',
      drugShape: null,
      description: '',
    },
  ];
  const drugs = useSelector((state: any) => state.requestDrugs.drugs);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setDrugsStateAction(initialValues));
  }, [dispatch]);

  useEffect(() => {
    if (drugs.length > 0) {
      dispatch(setDrugsStateAction([]));
    }
  }, []);
  return (
    <div className="px-4 mb-5">
      <Formik
        initialValues={{ drugs: initialValues }}
        enableReinitialize
        validationSchema={RequestDrugSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(setDrugsStateAction(values.drugs));
          router.push('/app/request-drugs/confirm-request-drugs');
        }}
      >
        {({ values, errors }) => {
          const allFieldsValid = values.drugs.every(
            (drug) => drug.drugName && drug.quantity && drug.drugShape,
          );
          return (
            <Form>
              <FieldArray name="drugs">
                {({ push, remove }) => (
                  <>
                    {values?.drugs?.map((item, index) => (
                      <AddNewRequestDrugForm
                        key={item.id}
                        index={index}
                        handleDelete={() => remove(index)}
                        data={item}
                        totalDrugs={values?.drugs?.length}
                      />
                    ))}
                    {values?.drugs?.length < 10 && (
                      <div className="flex justify-between items-center mt-2">
                        <div
                          className={`flex items-center text-sm gap-2 font-medium ${
                            !allFieldsValid
                              ? 'cursor-not-allowed opacity-50'
                              : 'cursor-pointer'
                          }`}
                          onClick={() => {
                            if (allFieldsValid) {
                              push({
                                id: uuidv4(), // Use uuidv4 for new ID
                                quantity: '',
                                drugName: '',
                                drugShape: null,
                                description: '',
                              });
                            }
                          }}
                        >
                          <NewPlusIconOutline
                            width={16}
                            height={16}
                            fill={colors.black}
                          />
                          <span className="mt-1">اضافه کردن دارو</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </FieldArray>
              <div className="flex justify-end mt-2">
                <Button
                  variant="primary"
                  size="medium"
                  type="submit"
                  disabled={!allFieldsValid || Object.keys(errors).length > 0}
                >
                  تأیید و ادامه
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RequestDrugsContent;
