import { useRouter } from 'next/router';

import CategoriesContent from './CategoriesContent';
import { MainLayout } from '@com/Layout';

const Categories = () => {
  const { query } = useRouter();
  return (
    <MainLayout title={query?.title} hasHeader hasBackButton>
      <CategoriesContent />
    </MainLayout>
  );
};

export default Categories;
