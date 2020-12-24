import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  currentLocale: string;
}

const initialState = {
  currentLocale: "en-EN"
} as State;

const slice = createSlice({
  name: "i18n",
  initialState: initialState,
  reducers: {
   changeLanguage(state, action: PayloadAction<string>){
     state.currentLocale = action.payload;
   }
  }
});

export const getCurrentLanguage = createSelector(
  (state: {[name]: State}) => state[name],
  (i18nState) => i18nState.currentLocale
);

export const reducer = slice.reducer;
export const actions = slice.actions;
export const name = slice.name;