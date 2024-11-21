import dynamic from 'next/dynamic';
const PolicyContainer = dynamic(() => import('@containers/policy'));

const Policy = () => {
  return <PolicyContainer />;
};
export default Policy;
