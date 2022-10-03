import s from "./Select.module.scss";
import svg_image from "../../../assets/select-arrow.svg";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useEffect, useRef, useState } from "react";

function Select(props) {

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
            setOpen(false);
        }
    }

    return (
        <div className={s.select} ref={selectRef}>
            <label {...props} htmlFor={props.id}>
                {props.placeholder}
            </label>
            <input {...props} type="text" className={s.input} ref={selectInput} />
            <img className={s.arrow_img} src={svg_image} alt="select" />
            <div className={isOpen ? s.options + " " + s.visible : s.options} ref={selectMenuRef} onClick={itemHandler}>
                <div className={s.option}>Net 1 Day</div>
                <div className={s.option}>Net 7 Days</div>
                <div className={s.option}>Net 14 Days</div>
                <div className={s.option}>Net 30 Days</div>
            </div>
        </div>
    )
}

export default Select;
