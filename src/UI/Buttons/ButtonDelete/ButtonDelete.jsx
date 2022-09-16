import s from "./ButtonDelete.module.scss";

function ButtonDelete(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    )
}

export default ButtonDelete;
