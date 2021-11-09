import { createSlice } from "@reduxjs/toolkit";
import {
  FeedbackState,
  SetFeedbackAction,
} from "./feedback.interfaces";
import * as selectors from "./feedback.selectors";
import * as sagas from "./feedback.sagas";
import { AlertTypes } from "components/AppAlertBox";

export const feedbackStore = createSlice({
  name: "feedback",
  initialState: {
    open: false,
    type: AlertTypes.Info,
    message: "",
  } as FeedbackState,
  reducers: {
    setFeedback: (state, { payload }: SetFeedbackAction) => {
      state.open = true;
      state.type = payload.type ?? 0;
      state.message = payload.message || state.message;
    },
    closeFeedback: (state) => {
      state.open = false;
    },
  },
});

export { selectors, sagas };
