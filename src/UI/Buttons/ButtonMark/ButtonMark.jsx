import s from "./ButtonMark.module.scss";

function ButtonMark(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    )
}

export default ButtonMark;
