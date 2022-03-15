import React, { memo } from "react";
import { Typography, Snackbar, SnackbarOrigin } from "@mui/material";
import { AppAlertBox } from "components";
import { useAppSnackbar } from "./index.hooks";

const anchorOrigin: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
};

export const AppSnackbar = memo(() => {
  const { open, type, message } = useAppSnackbar();

  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin}>
      <AppAlertBox type={type}>
        <Typography>{message}</Typography>
      </AppAlertBox>
    </Snackbar>
  );
});
