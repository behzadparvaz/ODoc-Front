import dynamic from 'next/dynamic';
const SearchByImageContainer = dynamic(() =>
  import('@containers/search').then((mod) => mod.SearchByImageContainer),
);

const SearchByImagePage = () => {
  return <SearchByImageContainer />;
};
export default SearchByImagePage;
