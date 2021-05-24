import { RootState } from "redux-store";

export const getCognitoAccessToken = (state: RootState) =>
  state?.cognito?.tokens?.access;
export const getCognitoAuthStatus = (state: RootState) =>
  state?.cognito?.authStatus;
export const getCognitoEmail = (state: RootState) => state?.cognito?.email;
export const getCognitoPassword = (state: RootState) =>
  state?.cognito?.password;
