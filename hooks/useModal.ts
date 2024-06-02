import {
  addModalAction,
  removeLastNModalAction,
  replaceLastModal,
  ReplaceLastModalAction,
} from '@redux/modal/modalActions';
import {
  AddModalAction,
  removeLastModalAction,
  removeAllModalAction,
  removeNthModalAction,
} from '../redux/modal/modalActions';
import { useDispatch } from 'react-redux';

const useModal = () => {
  const dispatch = useDispatch();

  return {
    addModal({ modal, props }: AddModalAction['payload']) {
      dispatch(addModalAction(modal, props));
    },
    replaceLastModal({ modal, props }: ReplaceLastModalAction['payload']) {
      dispatch(replaceLastModal(modal, props));
    },
    removeLastModal() {
      dispatch(removeLastModalAction());
    },
    removeLastNModal(numberOfModals: number) {
      dispatch(removeLastNModalAction(numberOfModals));
    },
    removeAllModalAction() {
      dispatch(removeAllModalAction());
    },
    removeNthModal(id: number) {
      dispatch(removeNthModalAction(id));
    },
  };
};
export default useModal;
