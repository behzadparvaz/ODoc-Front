import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
const Gender = {
  Male: { name: 'مرد', en: 'Male', code: 'M' },
  Female: { name: 'زن', en: 'Female', code: 'F' },
};
const SelectGender = ({ handleClick }) => {
  const handleClickItem = (item) => {
    handleClick(item);
  };
  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton
      className=" p-4"
      title="جنسیت"
    >
      {Object.values(Gender).map((item) => {
        return (
          <div
            onClick={() => handleClickItem(item)}
            className="py-2.5 border-b cursor-pointer border-gray-100"
          >
            {item.name}
          </div>
        );
      })}
    </BottomModalContainer>
  );
};

export default SelectGender;
