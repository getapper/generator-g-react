import React, { memo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppSnackbar } from "components";
import useAppHooks from "./index.hooks";

const App: React.FC = () => {
  const { theme } = useAppHooks();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>OK</div>} />
        </Routes>
      </BrowserRouter>
      <AppSnackbar />
    </ThemeProvider>
  );
};

export default memo(App);
