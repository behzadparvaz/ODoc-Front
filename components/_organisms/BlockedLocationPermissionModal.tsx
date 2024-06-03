import useModal from '@hooks/useModal';
import { generalTexts } from '@com/texts/generalTexts';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import Button from '@com/_atoms/Button';

type Props = {};

const BlockedLocationPermissionModal = (props: Props) => {
  const { removeLastModal } = useModal();
  return (
    <BottomModalContainer height={'auto'} minHeight={'160px'} isDraggable>
      <div className="w-full h-full flex flex-col select-none" style={{ direction: 'rtl' }}>
        <h5 className="text-xl font-medium text-grey-900 mb-2">{selectStoreTexts.blockedLocationPermissionTitle}</h5>
        <p className="text-sm font-normal text-grey-800 pl-2">{selectStoreTexts.blockedLocationPermissionCaption}</p>
        <p className="text-sm font-normal text-grey-800 pl-2 mb-9">{selectStoreTexts.blockedLocationPermissionHint}</p>

        <Button
          buttonType="contained"
          variant="primary"
          className="w-full mt-3"
          size="large"
          handleClick={() => removeLastModal()}
        >
          {generalTexts.IRealized}
        </Button>
      </div>
    </BottomModalContainer>
  );
};

export default BlockedLocationPermissionModal;
