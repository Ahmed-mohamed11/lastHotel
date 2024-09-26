// store/store.js

import { configureStore } from "@reduxjs/toolkit";
  import roomsReducer from "./slices/roomsSlice.js";
 

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
 
  },
});

export default store;
