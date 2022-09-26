import React, { memo, ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux-store";

const AppWrapper: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};

export default memo(AppWrapper);
