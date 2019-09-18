import React from "react";
import { UnconnectedTimer, mapStateToProps, mapDispatchToProps } from "./Timer";
import ShallowRenderer from "react-test-renderer/shallow";
import {
  startTimer,
  pauseTimer,
  changeTimerSecondsRemaining
} from "../actions";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedTimer timer={{ seconds: 2 }} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  const timer = { id: "fake_id", seconds: 20 };

  describe("if there is no timer instance for the timer", () => {
    const props = mapStateToProps({ timerInstances: {} }, { timer });

    it("should use the timer's seconds as the initialRemainingSeconds", () => {
      expect(props.initialRemainingSeconds).toEqual(timer.seconds);
    });

    it("should return running as false", () => {
      expect(props.running).toEqual(false);
    });
  });

  describe("if there is a timer instance for the timer", () => {
    describe("which is started", () => {
      const instance = {
        timerId: timer.id,
        totalSeconds: timer.seconds,
        remainingSeconds: timer.seconds - 10,
        running: true,
        startedAt: new Date(new Date().getTime() - 10 * 1000)
      };

      const props = mapStateToProps(
        { timerInstances: { [timer.id]: instance } },
        { timer }
      );

      it("should use the instance's remainingSeconds as the initialRemainingSeconds", () => {
        expect(props.initialRemainingSeconds).toEqual(
          instance.remainingSeconds
        );
      });

      it("should return running as true", () => {
        expect(props.running).toEqual(true);
      });
    });

    describe("which is paused", () => {
      const instance = {
        timerId: timer.id,
        totalSeconds: timer.seconds,
        remainingSeconds: timer.seconds - 10,
        running: false,
        startedAt: new Date(new Date().getTime() - 10 * 1000)
      };

      const props = mapStateToProps(
        { timerInstances: { [timer.id]: instance } },
        { timer }
      );

      it("should use the instance's remainingSeconds as the initialRemainingSeconds", () => {
        expect(props.initialRemainingSeconds).toEqual(
          instance.remainingSeconds
        );
      });

      it("should return running as false", () => {
        expect(props.running).toEqual(false);
      });
    });
  });
});

describe("mapDispatchToProps", () => {
  const timer = { id: "fake_id", seconds: 20 };

  it("should return a start function that dispatches a startTimer action for the timer", () => {
    const dispatch = jest.fn();
    const { start } = mapDispatchToProps(dispatch, { timer });
    start();
    expect(dispatch).toHaveBeenCalledWith(startTimer(timer));
  });

  it("should return a pause function that dispatches a pauseTimer action for the timer", () => {
    const dispatch = jest.fn();
    const { pause } = mapDispatchToProps(dispatch, { timer });
    pause();
    expect(dispatch).toHaveBeenCalledWith(pauseTimer(timer));
  });

  it("should return a changeSeconds function that dispatches a changeTimerSecondsRemaining action for the timer", () => {
    const dispatch = jest.fn();
    const { changeSeconds } = mapDispatchToProps(dispatch, { timer });
    changeSeconds(30);
    expect(dispatch).toHaveBeenCalledWith(
      changeTimerSecondsRemaining({ timer, seconds: 30 })
    );
  });
});
