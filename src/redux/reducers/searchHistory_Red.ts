import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../../types";

type initialStatetypes = {
    Place: Place[]
}
const initialState:initialStatetypes = {
  Place: []
};


const saveHistory = createSlice({
  name: 'saveHistory',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<Place>) => {
        state.Place = [action.payload, ...state.Place.filter(p => p.place_id !== action.payload.place_id)];
      },
      removeHistory: (state, action: PayloadAction<string>) => {
        state.Place = [...state.Place.filter(p => p.place_id !== action.payload)];
      }
  }
});

export const { setHistory, removeHistory } = saveHistory.actions;

export default saveHistory.reducer;