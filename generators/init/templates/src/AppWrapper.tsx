import React from "react";
import App from "./App/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor, history } from "redux-store";
import { ConnectedRouter } from "connected-react-router";

/**
 * @TODO: Import this wrapper in you index.tsx file like this:
 *
 * ReactDOM.render(
 *   <React.StrictMode>
 *     <AppWrapper>
 *       <App />
 *     </AppWrapper>
 *   </React.StrictMode>,
 *   document.getElementById('root')
 * );
 *
 * Where App is your main React UI component
 */
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
