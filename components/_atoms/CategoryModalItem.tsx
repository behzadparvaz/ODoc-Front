import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';

interface props {
  handleClick: () => void;
  title: string;
  className?: string;
}
const CategoryModalItem = ({ title, handleClick, className = '' }: props) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`flex items-center justify-between ${className}`}
    >
      {title}
      <ChevronLeftIconOutline height={24} width={24} fill={colors?.grey[400]} />
    </div>
  );
};
export default CategoryModalItem;
