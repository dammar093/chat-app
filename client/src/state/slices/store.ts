import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import usersReducer from "./usersSlice";
import onlineReducer from "./onlineSlice";
import messageReducer from "./messageSlice";

const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    online: onlineReducer,
    messages: messageReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;