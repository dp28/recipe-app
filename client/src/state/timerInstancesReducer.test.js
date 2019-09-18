import { timerInstancesReducer as reducer } from "./timerInstancesReducer";
import {
  startTimer,
  pauseTimer,
  changeTimerSecondsRemaining
} from "../actions";

describe("timerInstancesReducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({});
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with a startTimer action", () => {
    describe("when the timer has not been started before", () => {
      it("should add a timer instance", () => {
        const timers = reducer(initialState, startTimer({ id: "fake_id" }));
        expect(
          Object.keys(timers).length - Object.keys(initialState).length
        ).toEqual(1);
      });

      describe("the timer instance", () => {
        const timer = { id: "fake_id", seconds: 20 };
        const now = new Date();
        const timerInstance = reducer(initialState, startTimer(timer))[
          timer.id
        ];

        it("should have the timerId from the action", () => {
          expect(timerInstance.timerId).toEqual(timer.id);
        });

        it("should have the totalSeconds from the seconds in the timer", () => {
          expect(timerInstance.totalSeconds).toEqual(timer.seconds);
        });

        it("should have the remainingSeconds from the seconds in the timer", () => {
          expect(timerInstance.remainingSeconds).toEqual(timer.seconds);
        });

        it("should have now as the startedAt time", () => {
          const timeDifferenceInMillis =
            timerInstance.startedAt.getTime() - now.getTime();
          expect(timeDifferenceInMillis / 1000).toBeLessThan(1);
        });

        it("should set running to true", () => {
          expect(timerInstance.running).toEqual(true);
        });
      });
    });
  });

  describe("when the timer has had its time changed", () => {
    const timer = { id: "fake_id", seconds: 20 };
    const altered = {
      [timer.id]: {
        timerId: timer.id,
        totalSeconds: timer.seconds,
        remainingSeconds: 25,
        startedAt: null,
        running: false
      }
    };
    const instance = reducer(altered, startTimer(timer))[timer.id];

    it("should use the changed time", () => {
      expect(instance.remainingSeconds).toEqual(25);
    });

    it("should set running to true", () => {
      expect(instance.running).toEqual(true);
    });
  });

  describe("when the timer has been started before", () => {
    describe("when the timer is paused", () => {
      const timer = { id: "fake_id", seconds: 20 };
      const now = new Date();
      const paused = {
        [timer.id]: {
          timerId: timer.id,
          totalSeconds: timer.seconds,
          remainingSeconds: timer.seconds - 10,
          startedAt: new Date(now.getTime() - 10 * 1000),
          running: false
        }
      };

      it("should not add a timer instance", () => {
        const timers = reducer(paused, startTimer(timer));
        expect(Object.keys(timers).length - Object.keys(paused).length).toEqual(
          0
        );
      });

      describe("the timer instance", () => {
        const timer = { id: "fake_id", seconds: 20 };
        const now = new Date();
        const timerInstance = reducer(paused, startTimer(timer))[timer.id];
        const originalInstance = paused[timer.id];

        it("should have the timerId from the action", () => {
          expect(timerInstance.timerId).toEqual(timer.id);
        });

        it("should have the totalSeconds from the seconds in the timer", () => {
          expect(timerInstance.totalSeconds).toEqual(timer.seconds);
        });

        it("should have now, rather than the original startTime, as the startedAt time", () => {
          const timeDifferenceInMillis =
            timerInstance.startedAt.getTime() - now.getTime();
          expect(timeDifferenceInMillis / 1000).toBeLessThan(1);
        });

        it("should set running to true", () => {
          expect(timerInstance.running).toEqual(true);
        });

        it("should have the pre-exisiting remainingSeconds", () => {
          expect(timerInstance.remainingSeconds).toEqual(
            originalInstance.remainingSeconds
          );
        });
      });
    });
  });

  describe("with a pauseTimer action", () => {
    const timer = { id: "fake_id", seconds: 20 };
    const now = new Date();

    describe("when a timer has been started", () => {
      const startedTimerState = {
        [timer.id]: {
          timerId: timer.id,
          totalSeconds: timer.seconds,
          remainingSeconds: timer.seconds,
          startedAt: new Date(now.getTime() - 10 * 1000),
          running: true
        }
      };
      const startedTimerInstance = startedTimerState[timer.id];
      const pausedTimerInstance = reducer(startedTimerState, pauseTimer(timer))[
        timer.id
      ];

      it("should have the timerId from the action", () => {
        expect(pausedTimerInstance.timerId).toEqual(timer.id);
      });

      it("should have the totalSeconds from the seconds in the timer", () => {
        expect(pausedTimerInstance.totalSeconds).toEqual(timer.seconds);
      });

      it("should have the remainingSeconds as the seconds in the timer minus the seconds since the timer was started", () => {
        expect(pausedTimerInstance.remainingSeconds).toEqual(
          timer.seconds - 10
        );
      });

      it("should set running to false", () => {
        expect(pausedTimerInstance.running).toEqual(false);
      });

      it("should have the original startedAt time", () => {
        expect(pausedTimerInstance.startedAt).toEqual(
          startedTimerInstance.startedAt
        );
      });
    });

    describe("when a timer has been started, paused, then restarted", () => {
      const startedTimerState = {
        [timer.id]: {
          timerId: timer.id,
          totalSeconds: timer.seconds,
          remainingSeconds: timer.seconds - 5,
          startedAt: new Date(now.getTime() - 10 * 1000),
          running: true
        }
      };
      const restartedTimerInstance = startedTimerState[timer.id];
      const pausedTimerInstance = reducer(startedTimerState, pauseTimer(timer))[
        timer.id
      ];

      it("should have the timerId from the action", () => {
        expect(pausedTimerInstance.timerId).toEqual(timer.id);
      });

      it("should have the totalSeconds from the seconds in the timer", () => {
        expect(pausedTimerInstance.totalSeconds).toEqual(timer.seconds);
      });

      it("should have the remainingSeconds as the remainingSeconds in the restarted instance minus the seconds since the instance was restarted", () => {
        expect(pausedTimerInstance.remainingSeconds).toEqual(
          restartedTimerInstance.remainingSeconds - 10
        );
      });

      it("should set running to false", () => {
        expect(pausedTimerInstance.running).toEqual(false);
      });

      it("should have the original startedAt time", () => {
        expect(pausedTimerInstance.startedAt).toEqual(
          restartedTimerInstance.startedAt
        );
      });
    });
  });

  describe("with a changeTimerSecondsRemaining action", () => {
    const timer = { id: "fake_id", seconds: 20 };
    const now = new Date();

    describe("when a timer has not been started", () => {
      const changeAction = changeTimerSecondsRemaining({
        timer,
        seconds: 30
      });

      it("should add a timer instance", () => {
        const timers = reducer(initialState, changeAction);
        expect(
          Object.keys(timers).length - Object.keys(initialState).length
        ).toEqual(1);
      });

      describe("the timer instance", () => {
        const timerInstance = reducer(initialState, changeAction)[timer.id];

        it("should have the timerId from the action", () => {
          expect(timerInstance.timerId).toEqual(timer.id);
        });

        it("should have the totalSeconds from the seconds in the timer", () => {
          expect(timerInstance.totalSeconds).toEqual(timer.seconds);
        });

        it("should have the remainingSeconds from the seconds in the action", () => {
          expect(timerInstance.remainingSeconds).toEqual(changeAction.seconds);
        });

        it("should have null as the startedAt time", () => {
          expect(timerInstance.startedAt).toEqual(null);
        });

        it("should set running to false", () => {
          expect(timerInstance.running).toEqual(false);
        });
      });
    });

    describe("when a timer has been started", () => {
      const startedTimerState = {
        [timer.id]: {
          timerId: timer.id,
          totalSeconds: timer.seconds,
          remainingSeconds: timer.seconds,
          startedAt: new Date(now.getTime() - 10 * 1000),
          running: true
        }
      };
      const startedTimerInstance = startedTimerState[timer.id];
      const changeAction = changeTimerSecondsRemaining({
        timer,
        seconds: 30
      });
      const changedTimerInstance = reducer(startedTimerState, changeAction)[
        timer.id
      ];

      it("should not change the totalSeconds", () => {
        expect(changedTimerInstance.totalSeconds).toEqual(
          startedTimerInstance.totalSeconds
        );
      });

      it("should have the remainingSeconds as the seconds in the action", () => {
        expect(changedTimerInstance.remainingSeconds).toEqual(
          changeAction.seconds
        );
      });
    });
  });
});
