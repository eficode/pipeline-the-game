import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectOption } from '@pipeline/models';

export interface State {
  gameRoles: SelectOption[];
  devOpsMaturities: SelectOption[];
}

const initialState = {
  devOpsMaturities: [],
  gameRoles: [],
} as State;

const slice = createSlice({
  name: 'dynamicData',
  initialState: initialState,
  reducers: {
    setGameRoles(state, action: PayloadAction<SelectOption[]>) {
      state.gameRoles = action.payload;
    },
    setDevOpsMaturities(state, action: PayloadAction<SelectOption[]>) {
      state.devOpsMaturities = action.payload;
    },
  },
});

export const retrieveGameRoles = createAction('dynamicData/retrieveGameRoles');
export const retrieveDevOpsMaturities = createAction('dynamicData/retrieveDevOpsMaturities');

const getGameRoles = createSelector(
  (state: { [name]: State }) => state[name],
  dynamicDataState => dynamicDataState.gameRoles,
);

const getDevOpsMaturities = createSelector(
  (state: { [name]: State }) => state[name],
  dynamicDataState => dynamicDataState.devOpsMaturities,
);

export const reducer = slice.reducer;
export const actions = {
  ...slice.actions,
  retrieveGameRoles,
  retrieveDevOpsMaturities,
};
export const name = slice.name;
export const selectors = {
  getGameRoles,
  getDevOpsMaturities,
};
