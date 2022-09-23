import s from "./SelectFilter.module.scss";
import imageArrow from "../../../assets/select-arrow.svg";
import { useEffect, useRef, useState } from "react";
import CheckboxListItems from "../../CheckboxListItems/CheckboxListItems";
import { useDarkMode } from "../../../hooks/useDarkMode";

function SelectFilter(props) {

    const isDarkMode = useDarkMode();

    const [isOpen, setOpen] = useState(false);

    const selectRef = useRef(null);
    const selectMenuRef = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (!isOpen && selectRef.current.contains(event.target)) {
                setOpen(true);
                return;
            }
            if (isOpen) {
                if (!selectMenuRef.current.contains(event.target)) {
                    setOpen(!isOpen);
                }
            } else {
                if (selectMenuRef.current.contains(event.target)) {
                    setOpen(!isOpen);
                }
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isOpen, selectMenuRef, selectRef]);

    return (
        <div className={!isDarkMode ? s.select : s.select + " " + s.select_dark_mode} ref={selectRef}>
            <span>{props.children}</span>
            <img src={imageArrow} alt="arrow" />
            <div ref={selectMenuRef}
                className={isOpen ? s.listItem + " " + s.listItem_visible : s.listItem}>
                <CheckboxListItems />
            </div>
        </div>
    )
}

export default SelectFilter;
