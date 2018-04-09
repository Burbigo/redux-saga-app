import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED,
} from '../actions';

export const countdown = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_ASYNC:
      return action.payload
    case COUNTDOWN_TERMINATED:
    case CANCEL_INCREMENT_ASYNC:
      return 0
    default:
      return state
  }
}

export const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
