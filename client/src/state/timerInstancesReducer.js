import {
  START_TIMER,
  PAUSE_TIMER,
  CHANGE_TIMER_SECONDS_REMAINING
} from "../actions";

export function timerInstancesReducer(timerInstances = {}, action) {
  if (!action.timer) {
    return timerInstances;
  }
  const instance = getTimerInstance(timerInstances, action.timer);

  switch (action.type) {
    case START_TIMER:
      return {
        ...timerInstances,
        [action.timer.id]: startTimerInstance(instance)
      };
    case PAUSE_TIMER:
      return {
        ...timerInstances,
        [action.timer.id]: pauseTimerInstance(instance)
      };
    case CHANGE_TIMER_SECONDS_REMAINING:
      return {
        ...timerInstances,
        [action.timer.id]: {
          ...instance,
          remainingSeconds: action.seconds
        }
      };
    default:
      return timerInstances;
  }
}

function getTimerInstance(instances, timer) {
  if (instances[timer.id]) {
    return instances[timer.id];
  }
  return {
    timerId: timer.id,
    totalSeconds: timer.seconds,
    remainingSeconds: timer.seconds,
    startedAt: null,
    running: false
  };
}

function startTimerInstance(instance) {
  return {
    ...instance,
    running: true,
    startedAt: new Date()
  };
}

function pauseTimerInstance(instance) {
  const now = new Date();
  const secondsElapsed = Math.round(
    (now.getTime() - instance.startedAt.getTime()) / 1000
  );
  return {
    ...instance,
    running: false,
    remainingSeconds: instance.remainingSeconds - secondsElapsed
  };
}
