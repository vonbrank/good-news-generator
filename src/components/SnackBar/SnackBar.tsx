import { useState, useEffect } from "react";
import {
  Snackbar,
  Box,
  Alert,
  Collapse,
  List,
  useMediaQuery,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeAlertById } from "../../store/reducers/toast";

export const Toast = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const { alertList } = useAppSelector((state) => ({
    alertList: state.toast.alertList,
  }));

  useEffect(() => {
    if (alertList.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [alertList]);

  const minWidth600 = useMediaQuery("(min-width:600px)");

  return (
    <Snackbar open={open}>
      <Box sx={{ mt: 1, width: minWidth600 ? "36rem" : "100%" }}>
        <List>
          <TransitionGroup>
            {alertList.map((alert) => (
              <Collapse key={alert.alertId}>
                <Alert
                  severity={alert.severity}
                  sx={{ width: "100%", marginY: "0.2rem" }}
                  onClose={() => dispatch(removeAlertById(alert.alertId))}
                >
                  {alert.message}
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Snackbar>
  );
};
