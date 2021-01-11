import React, {memo, ReactNode} from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor, history } from "redux-store";
import { ConnectedRouter } from "connected-react-router";

/**
 * @TODO: Import this wrapper in your index.tsx file like this:
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
 * Where Index is your main React UI component
 */
const AppWrapper: React.FC<{children: ReactNode}> = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default memo(AppWrapper);
