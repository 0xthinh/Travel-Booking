import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    saveLoginUser: (state, action) => {
      state = action.payload;
    },
  },
});

const hotelSlice = createSlice({
  name: "hotel",
  initialState: [],
  reducers: {
    saveHotelList: (state, action) => {
      state = action.payload;
      console.log(state);
    },
  },
});

const store = configureStore({
  reducer: { user: userSlice.reducer, hotel: hotelSlice.reducer },
});

export const userAction = userSlice.actions;
export const hotelAction = hotelSlice.actions;

export default store;
