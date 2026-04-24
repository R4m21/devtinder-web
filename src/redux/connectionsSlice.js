import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return [...state, ...action.payload];
    },
    removeConnections: (state) => {
      return [];
    },
  },
  // extraReducers is used to listen to actions from other slices, in this case, we want to listen to updates from the requestsSlice
  extraReducers: (builder) => {
    builder.addCase("requests/updateRequests", (state, action) => {
      // When a request is accepted, we add the user to connections
      if (action.payload.status === "accepted") {
        return [...state, action.payload];
      }
      return state;
    });
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
