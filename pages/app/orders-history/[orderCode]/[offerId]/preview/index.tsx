import dynamic from 'next/dynamic';
const OfferPreviewContainer = dynamic(() =>
  import('@containers/order').then((mod) => mod.OfferPreviewContainer),
);

const OfferPreviewPage = () => {
  return <OfferPreviewContainer />;
};

export default OfferPreviewPage;
