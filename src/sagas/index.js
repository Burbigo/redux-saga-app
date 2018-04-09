import {
  take,
  put,
  call,
  fork,
  race,
  cancelled
} from 'redux-saga/effects';
import {
  eventChannel,
  END
} from 'redux-saga';
import {
  incrementAsync,
  increment,
  cancelIncrementAsync,
  countdownTerminated,
  INCREMENT_ASYNC,
  INCREMENT,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED
} from '../actions';

export const countdown = secs => {
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1
      if (secs > 0) listener(secs)
      else {
        listener(END)
        clearInterval(iv)
      }
    }, 1000)
    return () => {
      clearInterval(iv)
    }
  })
}

export function* incrementAsyncSaga({ payload }) {
  const chan = yield call(countdown, payload)
  try {
    while (true) {
      let seconds = yield take(chan)
      yield put(incrementAsync(seconds))
    }
  } finally {
    if (!(yield cancelled())) {
      yield put(increment())
      yield put(countdownTerminated())
    }
    chan.close()
  }
}

export function* watchIncrementAsync() {
  try {
    while (true) {
      const action = yield take(INCREMENT_ASYNC)
      // starts a 'Race' between an async increment and a user cancel action
      // if user cancel action wins, the incrementAsync will be cancelled automatically
      yield race([call(incrementAsyncSaga, action), take(CANCEL_INCREMENT_ASYNC)])
    }
  } finally {
  }
}

export default function* rootSaga() {
  yield fork(watchIncrementAsync)
}
