import { UserPoolManager } from "models";
import { put, takeEvery, select, take } from "redux-saga/effects";
import { actions, selectors } from "redux-store";
import {
  CognitoAuthenticationStatus,
  CognitoConfirmSignUpCodeAction,
  CognitoMFACodeAction,
  CognitoPhoneNumberSubmitAction,
  CognitoSignInAction,
  CognitoSignUpAction,
} from "../interfaces";

export function* cognitoManager() {
  const userPoolManager = new UserPoolManager(
    process.env["REACT_APP_COGNITO_USER_POOL_ID"],
    process.env["REACT_APP_COGNITO_CLIENT_ID"],
    ["email"],
  );

  while (true) {
    const action = yield take([
      actions.appStartup,
      actions.cognitoSignUp,
      actions.cognitoSignIn,
      actions.cognitoConfirmSignUpCode,
      actions.cognitoMFACode,
    ]);
    switch (action.type) {
      case actions.appStartup.type:
        yield cognitoAppStartupSaga();
        break;
      case actions.cognitoSignUp.type:
        yield cognitoSignUpSaga(userPoolManager, action);
        break;
      case actions.cognitoSignIn.type:
        yield cognitoSignInCodeSaga(
          userPoolManager,
          (action as CognitoSignInAction).payload.email,
          (action as CognitoSignInAction).payload.password,
        );
        break;
      case actions.cognitoConfirmSignUpCode.type:
        yield cognitoConfirmSignUpCodeSaga(userPoolManager, action);
        break;
      case actions.cognitoMFACode.type:
        yield cognitoMFACodeSaga(userPoolManager, action);
        break;
    }
  }
}

function* cognitoAppStartupSaga() {
  yield put(actions.cognitoChecking());
  const accessToken = yield select(selectors.getCognitoAccessToken);
  let isLogged = false;
  if (accessToken) {
    yield put(actions.getUsersMe.request({}));
    const resultAction = yield take([
      actions.getUsersMe.success.type,
      actions.getUsersMe.fail.type,
    ]);
    if (resultAction.type === actions.getUsersMe.success.type) {
      isLogged = true;
    } else {
      // Fail? Retry? Delete tokens? Offline mode?
    }
  }
  if (isLogged) {
    yield put(actions.cognitoValidSession());
  } else {
    yield put(
      actions.cognitoSetAuthStatus(CognitoAuthenticationStatus.LoggedOut),
    );
  }
}

function* cognitoSignUpSaga(
  userPoolManager: UserPoolManager,
  action: CognitoSignUpAction,
) {
  const { email, password, phone } = action.payload;

  try {
    yield userPoolManager.signup(email, password, {
      email,
      phone_number: phone,
    });
    yield put(
      actions.cognitoSetAuthStatus(
        CognitoAuthenticationStatus.WaitingConfirmCode,
      ),
    );
  } catch (e) {
    yield put(actions.cognitoSetAwsError(e));
  }
}

function* cognitoConfirmSignUpCodeSaga(
  userPoolManager: UserPoolManager,
  action: CognitoConfirmSignUpCodeAction,
) {
  const { email, password, code } = action.payload;

  try {
    yield userPoolManager.confirmAccount(email, code);
    if (password) {
      yield cognitoSignInCodeSaga(userPoolManager, email, password);
    } else {
      yield put(
        actions.cognitoSetAuthStatus(
          CognitoAuthenticationStatus.SignUpCodeConfirmed,
        ),
      );
    }
  } catch (e) {
    yield put(
      actions.cognitoSetAuthStatus(
        CognitoAuthenticationStatus.WaitingConfirmCode,
      ),
    );
    yield put(actions.cognitoSetAwsError(e));
  }
}

function* cognitoSignInCodeSaga(
  userPoolManager: UserPoolManager,
  email: string,
  password: string,
) {
  try {
    const cognitoUserSession = yield userPoolManager.login(email, password);
    yield put(
      actions.cognitoSetTokens({
        id: cognitoUserSession.signInUserSession.idToken.jwtToken,
        access: cognitoUserSession.signInUserSession.accessToken.jwtToken,
        refresh: cognitoUserSession.signInUserSession.refreshToken.token,
      }),
    );
  } catch (e) {
    console.error(e?.code);
    if (e?.code === "MFARequired") {
      yield put(
        actions.cognitoSetAuthStatus(CognitoAuthenticationStatus.MFARequired),
      );
    } else {
      yield put(
        actions.cognitoSetAuthStatus(CognitoAuthenticationStatus.LoggedOut),
      );
      yield put(actions.cognitoSetAwsError(e));
    }
  }
}

function* cognitoMFACodeSaga(
  userPoolManager: UserPoolManager,
  action: CognitoMFACodeAction,
) {
  const { code } = action.payload;

  try {
    const cognitoUserSession = yield userPoolManager.verifyMFACode(code);
    yield put(
      actions.cognitoSetTokens({
        id: cognitoUserSession.signInUserSession.idToken.jwtToken,
        access: cognitoUserSession.signInUserSession.accessToken.jwtToken,
        refresh: cognitoUserSession.signInUserSession.refreshToken.token,
      }),
    );
  } catch (e) {
    console.error(e?.code);
    if (e?.code === "MFARequired") {
      yield put(
        actions.cognitoSetAuthStatus(CognitoAuthenticationStatus.MFARequired),
      );
    } else {
      yield put(actions.cognitoSetAwsError(e));
    }
  }
}
