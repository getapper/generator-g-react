import React, { memo } from "react";
import { Typography, Snackbar, SnackbarOrigin } from "@material-ui/core";
import AppAlertBox from "components/AppAlertBox";
import useAppSnackbar from "./index.hooks";

const anchorOrigin: SnackbarOrigin = {
  vertical: "top",
  horizontal: "center",
};

const AppSnackbar = () => {
  const { open, type, message } = useAppSnackbar();

  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin}>
      <AppAlertBox type={type}>
        <Typography>{message}</Typography>
      </AppAlertBox>
    </Snackbar>
  );
};

export default memo(AppSnackbar);
