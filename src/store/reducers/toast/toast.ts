import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import { delay } from "../../../utils";
import { AppDispatch } from "../../store";

interface AlertBase {
  severity?: AlertColor;
  message: string;
  alertId: string;
}

const initialState: {
  alertList: AlertBase[];
} = {
  alertList: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertBase>) => {
      const newAlert = action.payload;
      state.alertList = [newAlert, ...state.alertList];
      // state.alertList = [];
    },
    removeAlertById: (state, action: PayloadAction<string>) => {
      state.alertList = state.alertList.filter(
        (alert) => alert.alertId !== action.payload
      );
    },
  },
});

export const { removeAlertById } = toastSlice.actions;

export const showTemporaryToastText = (
  alert: { severity?: AlertColor; message: string },
  autoHideDuration = 5000
) => {
  const { addAlert, removeAlertById } = toastSlice.actions;

  return async (dispatch: AppDispatch) => {
    const alertId = uuidv4();
    dispatch(addAlert({ ...alert, alertId: alertId }));
    if (autoHideDuration > 0) {
      await delay(autoHideDuration);
      dispatch(removeAlertById(alertId));
    }
  };
};

export default toastSlice.reducer;
