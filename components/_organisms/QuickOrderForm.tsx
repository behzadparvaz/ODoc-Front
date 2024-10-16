import QuickOrderFormItems from '@com/_molecules/QuickOrderFormItems';
import { useEffect, useState } from 'react';

interface props {
  formCount: number;
  className?: string;
  handleChangeForm?: (values) => void;
}

const QuickOrderForm = ({ formCount, className, handleChangeForm }: props) => {
  const [state, setState] = useState([]);
  const handleSetBody = (formFeilds, formIndex) => {
    const objKey = formFeilds?.feildName;
    if (!state[formIndex]) {
      setState([...state, { [formFeilds?.feildName]: formFeilds?.val }]);
    } else {
      const body = state;
      body[formIndex] = { ...body[formIndex], [objKey]: formFeilds?.val };
      setState(body);
    }
    handleChangeForm(state);
  };
  const handleDeleteFromBody = (formIndex: number) => {
    let array = [...state];
    if (array[formIndex]) {
      array.splice(formIndex, 1);
      setState(array);
    }
    handleChangeForm(array);
  };

  useEffect(() => {
    setState(state ? [...state, {}] : []);
  }, [formCount]);

  return (
    <div className={className}>
      {state?.map((item, index) => {
        return (
          <>
            <QuickOrderFormItems
              key={index}
              data={item}
              className={index > 0 ? 'border-t border-gray-100 pt-8' : ''}
              showDeleteButton={index > 0}
              handleDeleteItem={() => handleDeleteFromBody(index)}
              handelChange={(e) => handleSetBody(e, index)}
            />
          </>
        );
      })}
    </div>
  );
};
export default QuickOrderForm;
