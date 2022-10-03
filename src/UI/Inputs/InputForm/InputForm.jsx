import s from "./InputForm.module.scss";

function InputForm(props) {
    return (
        <>
            <label {...props} htmlFor={props.id}>
            {props.placeholder}
            </label>
            <input {...props} type="text" className={s.inputForm} />
        </>
    )
}

export default InputForm;
