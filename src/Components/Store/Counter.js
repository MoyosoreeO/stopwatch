import { createStore } from "redux";

const counterReducer = (
  state = { minutes: 0, seconds: 0, millis: 0 },
  action
) => {
  if (action.type === "INCREMENT") {
    if (state.seconds === 60) {
      return {
        minutes: parseInt(state.minutes) + 1,
        seconds: 0,
        millis: 0,
      };
    }
    if (state.millis === 100) {
      return {
        minutes: state.minutes,
        seconds: parseInt(state.seconds) + 1,
        millis: 0,
      };
    }
    return {
      minutes: state.minutes,
      seconds: state.seconds,
      millis: parseInt(state.millis) + 1,
    };
  }
  if (action.type === "RESET") {
    return { minutes: 0, seconds: 0, millis: 0 };
  }
  return state;
};
const store = createStore(counterReducer);

export default store;
