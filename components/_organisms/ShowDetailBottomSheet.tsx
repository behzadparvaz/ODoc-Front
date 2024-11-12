import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';

const ShowDetailBottomSheet = ({ title, description }) => {
  return (
    <BottomModalContainer
      title={title}
      height="auto"
      minHeight={300}
      hasCloseButton={true}
    >
      <p className="py-5">{description}</p>
    </BottomModalContainer>
  );
};
export default ShowDetailBottomSheet;
