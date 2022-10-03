import s from "./DatePicker.module.scss";

function DatePicker(props) {
    return (
        <>
            <label htmlFor={props.id} {...props}>
                {props.placeholder}
            </label>
            <input {...props} type="date" className={s.datePicker} />
        </>
    )
}

export default DatePicker;
