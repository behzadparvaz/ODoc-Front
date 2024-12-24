import dynamic from 'next/dynamic';

const SuperAppContainer = dynamic(() => import('@containers/superApp'), {
  ssr: false,
});

const SuperAppPage = () => <SuperAppContainer />;

export default SuperAppPage;
