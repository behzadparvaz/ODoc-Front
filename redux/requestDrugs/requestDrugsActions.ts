import { Action } from 'redux';
import requestDrugsTypes from './requestDrugsType';

interface DrugShape {
  name: string;
  id: number;
}
export interface Drug {
  id: number;
  quantity: string;
  drugName: string;
  drugShape: DrugShape | null;
}

// Define the action for setting the drugs state
interface SetDrugsStateAction extends Action<requestDrugsTypes.Set_Drugs_State> {
  payload: {
    drugs: Drug[];
  };
}

// Define the action for clearing the drugs state
interface ClearDrugsStateAction extends Action<requestDrugsTypes.Clear_Drugs_State> {
  payload: {
    drugs: Drug[];
  };
}

// Action creator to set the drugs state
export const setDrugsStateAction = (drugs: Drug[]): SetDrugsStateAction => {
  return {
    type: requestDrugsTypes.Set_Drugs_State,
    payload: { drugs },
  };
};

export const removeDrugAction = (drugId) => ({
  type: requestDrugsTypes.Remove_Drug_State,
  payload: drugId,
});

// Action creator to clear the drugs state
export const clearDrugsStateAction = (): ClearDrugsStateAction => ({
  type: requestDrugsTypes.Clear_Drugs_State,
  payload: { drugs: [] },
});