import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./selectors";
import {
  CognitoAuthenticationStatus,
  CognitoAWSErrorAction,
  CognitoConfirmSignUpCodeAction,
  CognitocognitoSetAuthStatusAction,
  CognitoSignInAction,
  CognitoSignUpAction,
  CognitoState,
  CognitoSetTokensAction,
} from "./interfaces";
import * as sagas from "./sagas";

const initialState: CognitoState = {
  authStatus: CognitoAuthenticationStatus.LoggedOut,
  email: null,
  password: null,
  tokens: null,
  awsError: null,
};

export const cognitoStore = createSlice({
  name: "cognito",
  initialState,
  reducers: {
    cognitoSignUp: (state, action: CognitoSignUpAction) => {
      state.authStatus = CognitoAuthenticationStatus.SigningUp;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.awsError = null;
    },
    cognitoConfirmCode: (state, action: CognitoConfirmSignUpCodeAction) => {
      state.authStatus = CognitoAuthenticationStatus.ConfirmingSignupCode;
      state.awsError = null;
    },
    cognitoSignIn: (state, action: CognitoSignInAction) => {
      state.authStatus = CognitoAuthenticationStatus.SigningIn;
      state.awsError = null;
    },
    cognitoSetTokens: (state, action: CognitoSetTokensAction) => {
      state.authStatus = CognitoAuthenticationStatus.LoggedIn;
      state.tokens = action.payload;
      state.awsError = null;
      state.email = null;
      state.password = null;
    },
    cognitoSetAwsError: (state, action: CognitoAWSErrorAction) => {
      state.awsError = action.payload;
    },
    cognitoSetAuthStatus: (
      state,
      action: CognitocognitoSetAuthStatusAction,
    ) => {
      state.authStatus = action.payload;
    },
    cognitoChecking: (state) => {
      state.authStatus = CognitoAuthenticationStatus.Checking;
      state.awsError = null;
      state.email = null;
      state.password = null;
    },
    cognitoValidSession: (state) => {
      state.authStatus = CognitoAuthenticationStatus.LoggedIn;
    },
  },
});

export { selectors, sagas };
