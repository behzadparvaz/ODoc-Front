import { Action } from 'redux';
import mapTypes from './mapType';

export interface SetMapStateAction extends Action<mapTypes.Set_Map_State> {
  payload: {
    [Key: string]: any;
  };
}
export const setMapStateAction = (values: SetMapStateAction['payload']): SetMapStateAction => {
  return {
    type: mapTypes.Set_Map_State,
    payload: values,
  };
};

interface SetLogMapStateAction extends Action<mapTypes.Set_Log_Map_State> {
  payload: {
    eventStartTime: number;
  };
}
export const setLogMapStateAction = (eventStartTime: number): SetLogMapStateAction => ({
  type: mapTypes.Set_Log_Map_State,
  payload: {
    eventStartTime,
  },
});

export interface ResetMapState extends Action<mapTypes.Reset_Map_State> {}
export const resetMapStateAction = (): ResetMapState => ({
  type: mapTypes.Reset_Map_State,
});

export type MapActions = SetMapStateAction | ResetMapState | SetLogMapStateAction;
