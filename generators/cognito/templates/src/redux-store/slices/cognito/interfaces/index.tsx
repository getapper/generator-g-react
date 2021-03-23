export enum CognitoAuthenticationStatus {
  Checking = "checking",
  LoggedOut = "logged_out",
  SigningUp = "signing_up",
  WaitingConfirmCode = "waiting_confirm_code",
  ConfirmingSignupCode = "confirming_signup_code",
  SignUpCodeConfirmed = "signup_code_confirmed",
  SigningIn = "signing-in",
  LoggedIn = "logged-in",
}

export interface CognitoState {
  authStatus: CognitoAuthenticationStatus;
  email: string;
  password: string;
  tokens: {
    id: string;
    access: string;
    refresh: string;
  };
  awsError: {
    code: string;
    name: string;
    message: string;
  };
}

export type CognitoSignUpAction = {
  payload: {
    email: string;
    password: string;
  };
};

export type CognitoConfirmSignUpCodeAction = {
  payload: {
    email: string;
    password: string;
    code: string;
  };
};

export type CognitoSignInAction = {
  payload: {
    email: string;
    password: string;
  };
};

export type CognitoSetTokensAction = {
  payload: {
    id: string;
    access: string;
    refresh: string;
  };
};

export type CognitocognitoSetAuthStatusAction = {
  payload: CognitoAuthenticationStatus;
};

export type CognitoAWSErrorAction = {
  payload: {
    code: string;
    name: string;
    message: string;
  };
};
