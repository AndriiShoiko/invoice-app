import { useDarkMode } from "../../../hooks/useDarkMode";
import s from "./InputForm.module.scss";

function InputForm(props) {
    const isDarkMode = useDarkMode();
    return (
        <>
            <label {...props} htmlFor={props.id} className={!isDarkMode ? s.label : s.label + " " + s.label_dark_mode}>
                {props.placeholder}
            </label>
            <input {...props} type="text" className={!isDarkMode ? s.inputForm : s.inputForm + " " + s.inputForm_dark_mode} />
        </>
    )
}

export default InputForm;
