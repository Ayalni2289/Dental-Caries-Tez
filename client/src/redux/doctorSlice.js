import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
      doctorItems: localStorage.getItem("doctor")
        ? JSON.parse(localStorage.getItem("doctor")).doctorItems
        : [],
    },
  });
  
  export default doctorSlice.reducer;
  