import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./UserSlice";

const store = configureStore({
  reducer: { userSliceReducer },
});

export default store;
