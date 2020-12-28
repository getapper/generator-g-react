import React, {memo} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppSnackbar from "components/AppSnackbar";
import useAppHooks from "./index.hooks";

const App: React.FC = () => {
  const { theme } = useAppHooks();

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <div>Test message</div>
          </Route>
        </Switch>
      </Router>
      <AppSnackbar />
    </MuiThemeProvider>
  );
};

export default memo(App);
