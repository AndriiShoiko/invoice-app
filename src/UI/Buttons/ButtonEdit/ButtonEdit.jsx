import s from "./ButtonEdit.module.scss";

function ButtonEdit(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    );
}

export default ButtonEdit;