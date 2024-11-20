import dynamic from 'next/dynamic';
const HomeContainer = dynamic(() => import('@containers/home'));

const HomePage = () => {
  return <HomeContainer />;
};
export default HomePage;
