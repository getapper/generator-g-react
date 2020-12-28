import * as extraActions from "../extra-actions";
import * as ajax from "./ajax";

export const reducers = {
  ajax: ajax.ajaxStore.reducer,
};

export const actions = {
  ...extraActions,
  ...ajax.ajaxStore.actions,
};

export const selectors = {
  ...ajax.selectors,
};

export const sagas = {
  ...ajax.sagas,
};
