import { useDarkMode } from "../../hooks/useDarkMode";
import s from "./CheckboxItem.module.scss";

function CheckboxItem(props) {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.checkboxItem : s.checkboxItem + " " + s.checkboxItem_dark_mode}>
            <input type="checkbox" className={s.checkbox} id={props.id}></input>
            <label className={s.label} htmlFor={props.id}>{props.children}</label>
        </div>
    )
}

export default CheckboxItem;
