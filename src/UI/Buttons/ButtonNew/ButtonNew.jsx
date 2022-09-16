import s from "./ButtonNew.module.scss";

function ButtonNew(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    )
}

export default ButtonNew;