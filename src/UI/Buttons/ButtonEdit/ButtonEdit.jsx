import s from "./ButtonEdit.module.scss";
import { useDarkMode } from "../../../hooks/useDarkMode";

function ButtonEdit(props) {
    const isDarkMode = useDarkMode();
    return (
        <button className={!isDarkMode ? s.button : s.button + " " + s.button_dark_mode}
            {...props}
            children={props.children}
        ></button>
    );
}

export default ButtonEdit;