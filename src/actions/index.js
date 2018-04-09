import { createAction } from 'redux-actions';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const CANCEL_INCREMENT_ASYNC = 'CANCEL_INCREMENT_ASYNC';

export const COUNTDOWN_TERMINATED = 'COUNTDOWN_TERMINATED';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

export const incrementAsync = createAction(INCREMENT_ASYNC);
export const cancelIncrementAsync = createAction(CANCEL_INCREMENT_ASYNC);

export const countdownTerminated = createAction(COUNTDOWN_TERMINATED);
