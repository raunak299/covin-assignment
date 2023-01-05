import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userList: [],
  },
  reducers: {
    setUserData(state, action) {
      state.userList = action.payload.userList;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
