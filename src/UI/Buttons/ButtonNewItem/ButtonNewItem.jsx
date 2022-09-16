import s from "./ButtonNewItem.module.scss";

function ButtonNewItem(props) {
    return (
        <button className={s.button} {...props} children={props.children}></button>
    )
}

export default ButtonNewItem;