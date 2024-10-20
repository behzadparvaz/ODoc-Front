import { Reducer } from 'redux';
import { MapActions } from './mapActions';
import mapTypes from './mapType';
import { TMapState } from '@utilities/types';

const initialState: TMapState = {
  defaultViewPort: {
    latitude: 35.69976003841564,
    longitude: 51.33808390275898,
    id: 129,
    name: 'تهران',
  },
  viewport: {
    latitude: 35.69976003841564,
    longitude: 51.33808390275898,
  },
  searchCity: '',
  searchLocation: '',
  filteredCities: [],
  searchLocationResult: [],
  selectedCity: {
    id: 129,
    name: 'تهران',
    lat: 35.6997548,
    lng: 51.3355162,
  },
  neshanCityName: 'تهران',
  showSearchCityResult: false,
  showSearchLocationResult: false,
  mapIsTouched: false,
  eventStartTime: 0,
};

const mapReducer: Reducer<TMapState, MapActions> = (state = initialState, action) => {
  switch (action.type) {
    //   ----------setState
    case mapTypes.Set_Map_State:
      return {
        ...state,
        ...action.payload,
      };
    case mapTypes.Reset_Map_State:
      return {
        ...initialState,
      };
    case mapTypes.Set_Log_Map_State:
      return {
        ...state,
        eventStartTime: action.payload.eventStartTime,
      };
    default:
      return state;
  }
};

export default mapReducer;
