import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  arrayData: [],
};

const dataArraySlice = createSlice({
  name: "dataArray",
  initialState,
  reducers: {
    setArrayData(state, action) {
      state.arrayData = action.payload;
    },
    // clearArrayData(state) {
    //   state.arrayData = [];
    // },
  },
});

export const { setArrayData, clearArrayData } = dataArraySlice.actions;
export default dataArraySlice.reducer;
