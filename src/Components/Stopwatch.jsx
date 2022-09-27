import store from "./Store/Counter";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import style from "./Stopwatch.module.css";
import play from "../assets/play.svg";
import stop from "../assets/pause.svg";
import refresh from "../assets/refresh.svg";
import send from "../assets/send.svg";
const Stopwatch = ({ onSend, request, config }) => {
  const [start, setStart] = useState(false);

  const watch = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (start) {
      const id = setInterval(() => {
        dispatch({ type: "INCREMENT" });
      }, 10);
      return () => {
        clearInterval(id);
      };
    }
  }, [start]);
  const startHandler = () => {
    setStart((prev) => {
      return !prev;
    });
  };
  const sendHandler = () => {
    onSend(true);
    setStart(false);
  };
  const resetHandler = () => {
    if (start) {
      setStart(false);
    }

    dispatch({ type: "RESET" });
  };

  return (
    <div className={`${style.card} ${start ? style.cardAnimation : ""}`}>
      <div>
        <h1>Race Timer</h1>
      </div>
      <div>
        <span>
          {watch.minutes < 10 && 0}
          {watch.minutes}
        </span>
        <span>
          {watch.seconds < 10 && 0}
          {watch.seconds}
        </span>
        <span>
          {watch.millis < 10 && 0}
          {watch.millis}
        </span>
      </div>
      <div>
        <button disabled={start} onClick={resetHandler}>
          <img src={refresh} alt="reset" />
        </button>
        <button className={!start ? style.startBtn : ""} onClick={startHandler}>
          {!start ? (
            <img src={play} alt="start" />
          ) : (
            <img src={stop} alt="pause" />
          )}
        </button>
        <button onClick={sendHandler}>
          <img src={send} alt="send data" />
        </button>
      </div>
    </div>
  );
};
export default Stopwatch;
