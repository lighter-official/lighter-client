import { configureStore } from "@reduxjs/toolkit";
import dataArrayReducer, {
  initialState as dataArrayInitialState,
} from "../features/dataArray/dataArraySlice";

export const store = configureStore({
  reducer: {
    dataArray: dataArrayReducer,
  },
  preloadedState: {
    dataArray: dataArrayInitialState,
  },
});
