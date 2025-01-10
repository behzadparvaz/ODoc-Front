import { Button } from '@com/_atoms/NewButton';
import { NewPlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { setDrugsStateAction } from '@redux/requestDrugs/requestDrugsActions';
import { RequestDrugSchema } from '@utilities/validationSchemas';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import AddNewRequestDrugForm from './AddNewRequestDrugForm';
import ActionBar from '@com/Layout/ActionBar';
import Image from 'next/image';

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
  const [formikValues, setFormikValues] = useState<DrugForm[]>(initialValues);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormikValues(drugs.length > 0 ? drugs : initialValues); // Ensure it defaults to initial if empty
  }, [drugs]);

  return (
    <div className="pb-[84px]">
      <div className="w-full mb-5">
        <Image
          src={'/images/requestDrugsProgressBar.svg'}
          alt="progress-bar"
          layout="responsive"
          width={460}
          height={57}
          objectFit="contain"
        />
      </div>

      <div className="px-4 mb-5">
        <Formik
          initialValues={{ drugs: formikValues }}
          enableReinitialize
          validationSchema={RequestDrugSchema}
          onSubmit={(values) => {
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
                <ActionBar type="singleAction" hasDivider>
                  <Button
                    variant="primary"
                    size="large"
                    type="submit"
                    className="w-full"
                    disabled={!allFieldsValid || Object.keys(errors).length > 0}
                  >
                    تأیید و ادامه
                  </Button>
                </ActionBar>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RequestDrugsContent;
