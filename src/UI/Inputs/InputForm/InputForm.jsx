import { useDarkMode } from "../../../hooks/useDarkMode";
import s from "./InputForm.module.scss";

function InputForm({ error, id, labelText, register, ...props }) {
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
                className={!isDarkMode ? s.inputForm : s.inputForm + " " + s.inputForm_dark_mode}
                {...props}
            />
        </>
    )
}

export default InputForm;
