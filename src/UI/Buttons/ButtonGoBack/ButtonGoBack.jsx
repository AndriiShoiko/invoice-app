import s from "./ButtonGoBack.module.scss";
import svg_back from "../../../assets/back-arrow.svg";
import { useDarkMode } from "../../../hooks/useDarkMode";

function ButtonGoBack() {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.buttonGoBack : s.buttonGoBack + " " + s.buttonGoBack_dark_mode}>
            <img src={svg_back} alt="go back"/>
            <p>Go back</p>
        </div>
    )
}

export default ButtonGoBack;
