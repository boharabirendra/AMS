import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    name: "birendra",
    address: "KANCHANPUR",
  },
  reducers: {},
});

export default testSlice.reducer;
