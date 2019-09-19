import {
  call,
  take,
  takeEvery,
  select,
  delay,
  cancel,
  fork,
  race
} from "redux-saga/effects";
import {
  START_TIMER,
  PAUSE_TIMER,
  CHANGE_TIMER_SECONDS_REMAINING
} from "../actions";
import { debug } from "../logging";

const getInstance = timer => state => state.timerInstances[timer.id];

export function* watchStartTimer() {
  yield takeEvery(START_TIMER, manageTimer);
}

function* manageTimer({ timer }) {
  const instance = yield select(getInstance(timer));

  const timerProcess = yield fork(startTiming, instance);
  const cancelTimerProcess = yield fork(cancelTimer, timerProcess, timer);
  const changeTimerProcess = yield fork(listenForChange, timerProcess, timer);
  yield race([timerProcess, cancelTimerProcess, changeTimerProcess]);
}

function* startTiming(timerInstance) {
  yield delay(timerInstance.remainingSeconds * 1000);
  debug("timer", timerInstance.timerId, "finished");
  yield fork(timerFinished);
}

function* cancelTimer(timerProcess, timer) {
  yield take(
    action => action.type === PAUSE_TIMER && action.timer.id === timer.id
  );
  yield cancel(timerProcess);
}

function* listenForChange(timerProcess, timer) {
  yield take(
    action =>
      action.type === CHANGE_TIMER_SECONDS_REMAINING &&
      action.timer.id === timer.id
  );
  yield cancel(timerProcess);
  const instance = yield select(getInstance(timer));
  if (instance.running) {
    yield fork(manageTimer, { timer });
  }
}

function* timerFinished(alarmCycleInMilliseconds = 300) {
  while (true) {
    yield call(beep, { durationInMilliseconds: alarmCycleInMilliseconds });
    yield call(vibrate, { durationInMilliseconds: alarmCycleInMilliseconds });
    yield delay(alarmCycleInMilliseconds * 2);
  }
}

const audio = window && window.AudioContext ? new AudioContext() : null;

function beep({
  durationInMilliseconds = 300,
  volumePercent = 50,
  frequencyInHertz = 1500
}) {
  if (!audio) {
    debug("window.AudioContext not available - skipping audible alarms");
    return;
  }
  const durationInSeconds = durationInMilliseconds / 1000;
  const oscillator = createOscillator(volumePercent, frequencyInHertz);
  oscillator.start(audio.currentTime);
  oscillator.stop(audio.currentTime + durationInSeconds);
}

function createOscillator(volumePercent, frequencyInHertz) {
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = frequencyInHertz;
  oscillator.type = "square";
  gain.connect(audio.destination);
  gain.gain.value = volumePercent * 0.01;
  return oscillator;
}

function vibrate({ durationInMilliseconds }) {
  if (window && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(durationInMilliseconds);
  }
}
