import { useDarkMode } from "../../../hooks/useDarkMode";
import s from "./DatePicker.module.scss";

function DatePicker(props) {
    const isDarkMode = useDarkMode();
    return (
        <>
            <label htmlFor={props.id} {...props} className={!isDarkMode ? s.label : s.label + " " + s.label_dark_mode}>
                {props.placeholder}
            </label>
            <input {...props} type="date" className={!isDarkMode ? s.datePicker : s.datePicker + " " + s.datePicker_dark_mode} />
        </>
    )
}

export default DatePicker;
