import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
  },
});

export default store;
