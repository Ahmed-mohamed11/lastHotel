import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../ApiUrl";

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async () => {
    const response = await api.get("/rooms/");
    return response.data;
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    Rooms: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default roomsSlice.reducer;
