import { CategoryOutlineIcon, ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';

interface props {
  handleClick: () => void;
  title: string;
  className?: string;
  wrapperClassName?: string;
  hasCategoryIcon?: boolean;
}
const CategoriesItem = ({
  title,
  handleClick,
  className = '',
  wrapperClassName = '',
  hasCategoryIcon,
}: props) => {
  return (
    <div className={`${wrapperClassName} flex gap-x-4 w-full items-center`}>
      {hasCategoryIcon?<CategoryOutlineIcon width={20} height={20} fill={colors?.black}/>:null}
      <div
        onClick={() => handleClick()}
        className={`flex items-center justify-between flex-auto text-sm ${className}`}
      >
        {title}
        <ChevronLeftIconOutline
          height={24}
          width={24}
          fill={colors?.grey[400]}
        />
      </div>
    </div>
  );
};
export default CategoriesItem;
