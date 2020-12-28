import * as extraActions from "../extra-actions";
import * as ajax from "./ajax";
import * as feedback from "./feedback";

export const reducers = {
  ajax: ajax.ajaxStore.reducer,
  feedback: feedback.feedbackStore.reducer,
};

export const actions = {
  ...extraActions,
  ...ajax.ajaxStore.actions,
  ...feedback.feedbackStore.actions,
};

export const selectors = {
  ...ajax.selectors,
  ...feedback.selectors,
};

export const sagas = {
  ...ajax.sagas,
  ...feedback.sagas,
};
