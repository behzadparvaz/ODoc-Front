import { Reducer } from 'redux';
import { Drug } from './requestDrugsActions';
import requestDrugsTypes from './requestDrugsType';
interface InitialState {
  drugs: Drug[];
}
const initialState: InitialState = {
  drugs: []
};

const requestDrugsReducer: Reducer<InitialState, any> = (state = initialState, action) => {
  switch (action.type) {
    case requestDrugsTypes.Set_Drugs_State:
      return {
        ...state,
        ...action.payload,
      };
    case requestDrugsTypes.Remove_Drug_State:
      return {
        ...state,
        drugs: state.drugs.filter(drug => drug.id !== action.payload),
      };
    case requestDrugsTypes.Clear_Drugs_State:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default requestDrugsReducer;
