import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  visible: false,
  text: '',
};


const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState,
  reducers: {
    show: (state, action) => {
      state.visible = true
      state.text = action?.payload || ""
    },
    hide: (state) => {
      state.visible = false
      state.text = ""
    },
  }
});

export const { show, hide } = spinnerSlice.actions;

export default spinnerSlice.reducer;