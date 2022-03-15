import React, { memo } from "react";
import { CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import { Switch, Route } from "react-router-dom";
import { AppButton, AppSnackbar } from "components";
import useAppHooks from "./index.hooks";

const App: React.FC = () => {
  const { theme } = useAppHooks();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/">
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h2">Buttons</Typography>
            </Grid>
            <Grid item xs={4}>
              <AppButton>Text Button</AppButton>
            </Grid>
            <Grid item xs={4}>
              <AppButton variant="contained">Contained Button</AppButton>
            </Grid>
            <Grid item xs={4}>
              <AppButton variant="outlined">Outlined Button</AppButton>
            </Grid>
            <Grid item xs={4}>
              <AppButton color="secondary">Text Button</AppButton>
            </Grid>
            <Grid item xs={4}>
              <AppButton color="secondary" variant="contained">
                Contained Button
              </AppButton>
            </Grid>
            <Grid item xs={4}>
              <AppButton color="secondary" variant="outlined">
                Outlined Button
              </AppButton>
            </Grid>
          </Grid>
        </Route>
      </Switch>
      <AppSnackbar />
    </ThemeProvider>
  );
};

export default memo(App);
