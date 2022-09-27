import style from "./BackDrop.module.css";

const Backdrop = (props) => {
  return (
    <div className={style.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
export default Backdrop;
