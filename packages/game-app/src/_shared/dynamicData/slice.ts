import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DevOpsMaturitiesDoc, GameRolesDoc } from '@pipeline/common';
import { getCurrentLanguage } from '../i18n/slice';
import { SelectOption } from '@pipeline/models';

export interface State {
  gameRoles: GameRolesDoc | null;
  devOpsMaturities: DevOpsMaturitiesDoc | null;
}

const initialState = {
  devOpsMaturities: null,
  gameRoles: null,
} as State;

const slice = createSlice({
  name: 'dynamicData',
  initialState: initialState,
  reducers: {
    setGameRoles(state, action: PayloadAction<GameRolesDoc>) {
      state.gameRoles = action.payload;
    },
    setDevOpsMaturities(state, action: PayloadAction<DevOpsMaturitiesDoc>) {
      state.devOpsMaturities = action.payload;
    },
  },
});

export const retrieveGameRoles = createAction('dynamicData/retrieveGameRoles');
export const retrieveDevOpsMaturities = createAction('dynamicData/retrieveDevOpsMaturities');

const _mapToSelectOption = (
  source: { [key: string]: { [key: string]: string } },
  key: string,
  currentLanguage: string,
): SelectOption => {
  const labelObj = source[key];
  const supportedLanguage = currentLanguage in labelObj ? currentLanguage : 'en';
  return { value: key, label: labelObj[supportedLanguage] } as SelectOption;
};

const getGameRolesOptions = createSelector(
  (state: { [name]: State }) => state[name],
  getCurrentLanguage,
  (dynamicDataState, currentLanguage) => {
    if (dynamicDataState.gameRoles === null) {
      return [];
    }
    return dynamicDataState.gameRoles.roles.map(m =>
      _mapToSelectOption(dynamicDataState.gameRoles!.labels, m, currentLanguage),
    );
  },
);

const getDevOpsMaturitiesOptions = createSelector(
  (state: { [name]: State }) => state[name],
  getCurrentLanguage,
  (dynamicDataState, currentLanguage) => {
    if (dynamicDataState.devOpsMaturities === null) {
      return [];
    }
    return dynamicDataState.devOpsMaturities.maturities.map(m =>
      _mapToSelectOption(dynamicDataState.devOpsMaturities!.labels, m, currentLanguage),
    );
  },
);

export const reducer = slice.reducer;
export const actions = {
  ...slice.actions,
  retrieveGameRoles,
  retrieveDevOpsMaturities,
};
export const name = slice.name;
export const selectors = {
  getGameRolesOptions,
  getDevOpsMaturitiesOptions,
};
