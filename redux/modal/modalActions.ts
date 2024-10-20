import { Action } from 'redux';
import modalTypes from './modalTypes';

interface AddModal {
  payload: {
    modal: (PropsType: { [Key: string]: any }) => JSX.Element;
    props?: { [Key: string]: any } | undefined;
    historyUrl?: string;
  };
}
export type AddModalAction = AddModal & Action<modalTypes.Add_Modal>;
export const addModalAction = (
  modalComponent: AddModal['payload']['modal'],
  modalProps?: AddModal['payload']['props'],
  url?: AddModal['payload']['historyUrl']
): AddModalAction => {
  return {
    type: modalTypes.Add_Modal,
    payload: { modal: modalComponent, props: modalProps, historyUrl: url },
  };
};
export type ReplaceLastModalAction = AddModal &
  Action<modalTypes.Replace_Last_Modal>;

export const replaceLastModal = (
  modalComponent: AddModal['payload']['modal'],
  modalProps?: AddModal['payload']['props'],
  url?: AddModal['payload']['historyUrl']
): ReplaceLastModalAction => {
  return {
    type: modalTypes.Replace_Last_Modal,
    payload: { modal: modalComponent, props: modalProps, historyUrl: url },
  };
};
type RemoveLastModalAction = Action<modalTypes.Remove_Last_Modal>;
export const removeLastModalAction = (): RemoveLastModalAction => ({
  type: modalTypes.Remove_Last_Modal,
});

type RemoveLastNModalAction = Action<modalTypes.Remove_Last_N_Modal> & {
  payload: number;
};
export const removeLastNModalAction = (
  numberOfModals: number
): RemoveLastNModalAction => ({
  type: modalTypes.Remove_Last_N_Modal,
  payload: numberOfModals,
});

type RemoveAllModalAction = Action<modalTypes.Remove_All_Modal>;
export const removeAllModalAction = (): RemoveAllModalAction => ({
  type: modalTypes.Remove_All_Modal,
});

type RemoveNthModalAction = Action<modalTypes.Remove_Nth_Modal> & {
  payload: number;
};
export const removeNthModalAction = (id: number): RemoveNthModalAction => ({
  type: modalTypes.Remove_Nth_Modal,
  payload: id,
});

export type ModalActions =
  | AddModalAction
  | ReplaceLastModalAction
  | RemoveLastModalAction
  | RemoveLastNModalAction
  | RemoveAllModalAction
  | RemoveNthModalAction;
