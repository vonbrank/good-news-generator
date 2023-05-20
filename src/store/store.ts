import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./reducers/toast";

const store = configureStore({
  reducer: {
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
