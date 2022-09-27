import style from "./SendDataModal.module.css";
import { useEffect } from "react";

import { useState, useRef } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import Backdrop from "./BackDrop";
const nameReducer = (state, action) => {
  if (action.type === "USER") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
};
const distanceReducer = (state, action) => {
  if (action.type === "USER") {
    return { value: action.value, isValid: action.value.trim() > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim() > 0 };
  }
};

const SendDataModal = ({
  onClose,
  openBackDrop,
  onAddData,
  error,
  loading,
}) => {
  //handling form logic
  const [minutes, seconds, millis] = useSelector((state) => {
    return [state.minutes, state.seconds, state.millis];
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [name, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const { value: nameValue, isValid: nameIsValid } = name;
  const [distance, dispatchDistance] = useReducer(distanceReducer, {
    value: "",
    isValid: null,
  });
  const { value: distanceValue, isValid: distanceIsValid } = distance;

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER", value: event.target.value });
  };
  const nameBlurhandler = () => {
    dispatchName({ type: "BLUR" });
  };
  const nameRef = useRef();

  const distanceChangeHandler = (event) => {
    dispatchDistance({ type: "USER", value: event.target.value });
  };
  const distanceBlurhandler = () => {
    dispatchDistance({ type: "BLUR" });
  };
  const distanceRef = useRef();
  const timeRef = useRef();

  const submitHandler = (event) => {
    if (formIsValid) {
      const data = {
        name: nameValue,
        distance: `${distanceValue}M`,
        time: timeRef.current.value,
      };
      onAddData(data);
    }

    if (!nameIsValid) {
      nameRef.current.focus();
    } else if (!distanceIsValid) {
      distanceRef.current.focus();
    }
  };

  useEffect(() => {
    setFormIsValid(nameIsValid && distanceIsValid);
  }, [nameIsValid, distanceIsValid]);
  const backdropClickHandler = () => {
    onClose(false);
  };

  return (
    <>
      {openBackDrop && <Backdrop onClick={backdropClickHandler} />}
      <div className={style.modal}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div
            className={` ${style.controls} ${
              nameIsValid === false ? style.invalid : ""
            }`}
          >
            <label>Name:</label>
            <input
              onChange={nameChangeHandler}
              onBlur={nameBlurhandler}
              ref={nameRef}
              type="text"
            />
          </div>
          <div
            className={`${style.controls} ${
              distanceIsValid === false ? style.invalid : ""
            }`}
          >
            <label>Distance:</label>
            <input
              onChange={distanceChangeHandler}
              onBlur={distanceBlurhandler}
              ref={distanceRef}
              type="number"
              step="10"
            />
          </div>
          <div className={style.controls}>
            <label>Time:</label>
            <input
              ref={timeRef}
              type="text"
              defaultValue={`${minutes}:${seconds}:${millis}`}
            />
          </div>
          <div className={style.btns}>
            <button
              onClick={() => {
                onClose(false);
              }}
            >
              Close
            </button>
            <button onClick={submitHandler}>
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};
export default SendDataModal;
