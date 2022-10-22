import s from "./Select.module.scss";
import svg_image from "../../../assets/select-arrow.svg";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useEffect, useRef, useState } from "react";

function Select({ error, id, labelText, defaultValue, arrValues, register, handlerSetValue, ...props }) {

    const { ref, ...allRegister } = register;

    const isDarkMode = useDarkMode();
    const [isOpen, setOpen] = useState(false);

    const selectRef = useRef(null);
    const selectMenuRef = useRef(null);
    const selectInput = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (!isOpen &&
                selectRef.current.contains(event.target) &&
                selectInput.current.contains(event.target)) {
                setOpen(true);
                return;
            }
            if (isOpen) {
                if (!selectMenuRef.current.contains(event.target)) {
                    setOpen(false);
                }
            } else {
                if (selectMenuRef.current.contains(event.target)) {
                    setOpen(false);
                }
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isOpen, selectMenuRef, selectRef]);

    function itemHandler(e) {
        if (selectMenuRef.current.contains(e.target)) {
            selectInput.current.value = e.target.outerText;
            selectInput.current.defaultValue = e.target.outerText;
            handlerSetValue(id, e.target.outerText);
            console.log(selectInput);
            setOpen(false);
        }
    }

    return (
        <div className={!isDarkMode ? s.select : s.select + " " + s.select_dark_mode} ref={selectRef}>
            <label
                htmlFor={id}
                className={s.label}
                error={error}
            >
                {labelText}
            </label>
            <input
                type="text"
                className={s.input}
                {...props}
                {...allRegister}
                ref={(e) => {
                    ref(e);
                    selectInput.current = e;
                }}
                defaultValue={`Net ${defaultValue} Day`
                }
                error={error}
                onChange={(e) => console.log(e)}
            />

            <img className={s.arrow_img} src={svg_image} alt="select" />
            <div className={isOpen ? s.options + " " + s.visible : s.options} ref={selectMenuRef} onClick={itemHandler}>
                {arrValues.map((element) => {
                    return (
                        <div className={s.option} key={element.id}>{element.description}</div>
                    );
                })}
            </div>
        </div>
    )
}

export default Select;
