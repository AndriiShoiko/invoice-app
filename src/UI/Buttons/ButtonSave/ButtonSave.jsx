import s from "./ButtonSave.module.scss";

function ButtonSave(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    )
}

export default ButtonSave;