import { put, takeEvery, delay, take, call, race } from "redux-saga/effects";
import { actions } from "redux-store/slices";
import { Action } from "redux";
import { ApiFailAction } from "redux-store/extra-actions/apis";
import { AlertTypes } from "components/AppAlertBox";

function* closeFeedbackTask() {
  yield delay(5000);
  yield put(actions.closeFeedback());
}

export function* closeFeedbackSaga() {
  yield takeEvery(actions.setFeedback.type, function* () {
    yield race({
      task: call(closeFeedbackTask),
      cancel: take(actions.setFeedback.type),
    });
  });
}

export function* ajaxSuccessFeedbackSaga() {
  /*
  yield takeEvery(actions.postSomethingApi.success.type, function* () {
    yield put(
      actions.setFeedback({
        type: AlertTypes.success,
        icon: AlertIcons.info,
        message: "Api succes message!",
      })
    );
  });
   */
}

export function* ajaxFailFeedbackSaga() {
  yield takeEvery(
    (action: Action) => /^apis\/(.*?)\/fail$/.test(action.type),
    function* (action: ApiFailAction) {
      switch (action.type) {
        default:
          yield put(
            actions.setFeedback({
              type: AlertTypes.error,
              message: action.payload.message,
            })
          );
      }
    }
  );
}
