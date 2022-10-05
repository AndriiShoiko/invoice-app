import { useDarkMode } from "../../../hooks/useDarkMode";
import s from "./ButtonNewItem.module.scss";

function ButtonNewItem(props) {

    const isDarkMode = useDarkMode();

    return (
        <button className={!isDarkMode ? s.button : s.button + " " + s.button_dark_mode}
            {...props}
            children={props.children}></button>
    )
}

export default ButtonNewItem;