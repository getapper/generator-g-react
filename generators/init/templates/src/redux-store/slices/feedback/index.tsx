import { createSlice } from "@reduxjs/toolkit";
import {
  FeedbackState,
  SetFeedbackAction,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";
import { AlertTypes } from "components/AppAlertBox";

export const feedbackStore = createSlice({
  name: "feedback",
  initialState: {
    open: false,
    type: AlertTypes.info,
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
