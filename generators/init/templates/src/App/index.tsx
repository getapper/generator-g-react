import React, {memo} from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { AppSnackbar } from "components";
import useAppHooks from "./index.hooks";

const App: React.FC = () => {
  const { theme } = useAppHooks();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/">
          <div>Test message</div>
        </Route>
      </Switch>
      <AppSnackbar />
    </MuiThemeProvider>
  );
};

export default memo(App);
