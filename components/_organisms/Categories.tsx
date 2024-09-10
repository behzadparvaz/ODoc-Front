import { ArrowRightIconOutline } from '@com/icons';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import CategoriesContent from './CategoriesContent';
const Categories = () => {
  const { query, back } = useRouter();
  return (
    <div
      className={` ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} bg-white min-h-screen pt-[57px]`}
    >
      <div
        className={`border border-grey-100 fixed inset-x-0 top-0 flex items-center bg-white py-4 px-4 gap-x-4  ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
      >
        <div onClick={() => back()}>
          <ArrowRightIconOutline height={24} width={24} fill={colors.black} />
        </div>

        <p>{query?.title}</p>
      </div>
      <CategoriesContent/>
    </div>
  );
};

export default Categories;
