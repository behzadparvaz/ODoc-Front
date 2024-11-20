import dynamic from 'next/dynamic';
const SearchContainer = dynamic(() => import('@containers/search/otc-search'));

const SearchPage = () => {
  return <SearchContainer />;
};
export default SearchPage;
