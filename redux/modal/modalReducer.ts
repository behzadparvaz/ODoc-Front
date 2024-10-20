import { ModalType } from '@utilities/interfaces/modal';
import { Reducer } from 'react';
import { ModalActions } from './modalActions';
import modalTypes from './modalTypes';

const initialState: ModalType = [];

let id = 0;
const modalReducer: Reducer<ModalType, ModalActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case modalTypes.Add_Modal:
      return [
        ...state,
        { id: id++, props: action.payload.props, modal: action.payload.modal },
      ];
    case modalTypes.Remove_All_Modal:
      return initialState;
    case modalTypes.Remove_Last_Modal:
      return state.filter((m, index) => index + 1 !== state.length);
    case modalTypes.Remove_Nth_Modal:
      return state.filter((m) => m.id !== action.payload);
    case modalTypes.Replace_Last_Modal:
      const data = {
        id: id++,
        props: action.payload.props,
        modal: action.payload.modal,
      };
      return state.length
        ? state.map((m, i) => (i + 1 === state.length ? data : m))
        : [data];
    default:
      return state;
  }
};

export default modalReducer;
