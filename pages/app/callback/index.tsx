import dynamic from 'next/dynamic';
const CallBackContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.CallBackContainer),
);

const CallBackPage = () => {
  return <CallBackContainer />;
};
export default CallBackPage;
