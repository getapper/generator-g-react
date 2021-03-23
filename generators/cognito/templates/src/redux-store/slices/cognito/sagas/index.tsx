import { UserPoolManager } from "models";
import { put, takeEvery, select, take } from "redux-saga/effects";
import { actions, selectors } from "redux-store";
import { CognitoAuthenticationStatus } from "../interfaces";

export function* cognitoAppStartupSaga() {
  yield takeEvery(actions.appStartup, function* () {
    yield put(actions.cognitoChecking());
    const accessToken = yield select(selectors.getCognitoAccessToken);
    let isLogged = false;
    if (accessToken) {
      /*
      yield put(actions.getUsersMe.request({}));
      const resultAction = yield take([
        actions.getUsersMe.success.type,
        actions.getUsersMe.fail.type,
      ]);
      if (resultAction.type === actions.getUsersMe.success) {
        isLogged = true;
      } else {
        // Fail? Retry? Delete tokens? Offline mode?
      }
       */
    }
    if (isLogged) {
      yield put(actions.cognitoValidSession());
    }
  });
}

export function* cognitoSignUpSaga() {
  yield takeEvery(actions.cognitoSignUp, function* (action) {
    const { email, password } = action.payload;
    const userPoolManager = new UserPoolManager(
      process.env["REACT_APP_COGNITO_USER_POOL_ID"],
      process.env["REACT_APP_COGNITO_CLIENT_ID"],
    );

    try {
      yield userPoolManager.signup(email, password);
      yield put(
        actions.cognitoSetAuthStatus(
          CognitoAuthenticationStatus.WaitingConfirmCode,
        ),
      );
    } catch (e) {
      yield put(actions.cognitoSetAwsError(e));
    }
  });
}

export function* cognitoConfirmSignUpCodeSaga() {
  yield takeEvery(actions.cognitoConfirmCode, function* (action) {
    const { email, password, code } = action.payload;
    const userPoolManager = new UserPoolManager(
      process.env["REACT_APP_COGNITO_USER_POOL_ID"],
      process.env["REACT_APP_COGNITO_CLIENT_ID"],
    );

    try {
      yield userPoolManager.confirmAccount(email, code);
      if (password) {
        yield put(
          actions.cognitoSignIn({
            email,
            password,
          }),
        );
      } else {
        yield put(
          actions.cognitoSetAuthStatus(
            CognitoAuthenticationStatus.SignUpCodeConfirmed,
          ),
        );
      }
    } catch (e) {
      yield put(actions.cognitoSetAwsError(e));
    }
  });
}

export function* cognitoSignInCodeSaga() {
  yield takeEvery(actions.cognitoSignIn, function* (action) {
    const { email, password } = action.payload;
    const userPoolManager = new UserPoolManager(
      process.env["REACT_APP_COGNITO_USER_POOL_ID"],
      process.env["REACT_APP_COGNITO_CLIENT_ID"],
    );

    try {
      const cognitoUserSession = yield userPoolManager.login(email, password);
      yield put(
        actions.cognitoSetTokens({
          id: cognitoUserSession.getIdToken().jwtToken,
          access: cognitoUserSession.getAccessToken().jwtToken,
          refresh: cognitoUserSession.getRefreshToken().token,
        }),
      );
    } catch (e) {
      yield put(actions.cognitoSetAwsError(e));
    }
  });
}
