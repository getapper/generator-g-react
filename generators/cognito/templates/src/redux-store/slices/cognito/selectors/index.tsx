import { RootState } from "redux-store";

export const getCognitoAccessToken = (state: RootState) =>
  state?.cognito?.tokens?.access;
