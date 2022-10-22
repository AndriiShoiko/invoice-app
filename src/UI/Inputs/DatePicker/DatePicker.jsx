import { useDarkMode } from "../../../hooks/useDarkMode";
import s from "./DatePicker.module.scss";

function DatePicker({ error, id, labelText, register, ...props }) {
    const isDarkMode = useDarkMode();
    return (
        <>
            <label
                htmlFor={id}
                className={!isDarkMode ? s.label : s.label + " " + s.label_dark_mode}
                error={error}
            >
                {labelText}
            </label>
            <input
                id={id}
                error={error}
                {...register}
                type="date"
                className={!isDarkMode ? s.datePicker : s.datePicker + " " + s.datePicker_dark_mode}
                {...props}
            />
        </>
    )
}

export default DatePicker;
