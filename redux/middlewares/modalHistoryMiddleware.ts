import { ModalType } from '@utilities/interfaces/modal';
import { Store } from 'redux';
import { ModalActions } from '@redux/modal/modalActions';

const modalHistoryMiddleWare = (store: Store) => (next) => (action: ModalActions) => {
  const modals: ModalType = store.getState().modals;
  // switch (
  //   action.type
  // case modalTypes.Add_Modal:
  //   history.pushState(
  //     null,
  //     '',
  //     action.payload.historyUrl || location.pathname
  //   );
  //   break;
  // case modalTypes.Replace_Last_Modal:
  //   if (modals.length) {
  //     history.replaceState(null, '', action.payload.historyUrl || location.pathname);
  //   } else {
  //     history.pushState(null, '', action.payload.historyUrl || location.pathname);
  //   }

  //   break;
  // case modalTypes.Remove_Last_Modal:
  //   history.replaceState({ ...history.state, options: { shallow: true } }, '');
  //   break;
  // case modalTypes.Remove_All_Modal:
  //   modals.forEach(() => {
  //     history.pushState(null, '', location.pathname);
  //   });
  //   break;
  // ) {
  // }
  return next(action);
};
export default modalHistoryMiddleWare;
