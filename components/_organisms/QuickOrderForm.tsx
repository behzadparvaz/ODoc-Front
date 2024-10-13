import QuickOrderFormItems from '@com/_molecules/QuickOrderFormItems';

interface props {
  formCount: number;
  className?: string;
  handleChangeForm?: (values) => void;
}

const body = [];
const QuickOrderForm = ({ formCount, className, handleChangeForm }: props) => {
  const handleSetBody = (formFeilds, formIndex) => {
    const objKey = formFeilds?.feildName;
    if (!body[formIndex]) {
      body?.push({ [formFeilds?.feildName]: formFeilds?.val });
    } else {
      body[formIndex] = { ...body[formIndex], [objKey]: formFeilds?.val };
    }
    handleChangeForm(body);
  };
  return (
    <div className={className}>
      {Array.apply(null, { length: formCount }).map((item, index) => {
        return (
          <div
            key={index}
            className={
              formCount - 1 !== index ? 'border-b border-gray-100 pb-8' : ''
            }
          >
            <QuickOrderFormItems
              handelChange={(e) => handleSetBody(e, index)}
            />
          </div>
        );
      })}
    </div>
  );
};
export default QuickOrderForm;
