import dynamic from 'next/dynamic';
const Categories = dynamic(() => import('@com/_organisms/Categories'));

const CategoriesPage = () => {
  return <Categories />;
};

export default CategoriesPage;
