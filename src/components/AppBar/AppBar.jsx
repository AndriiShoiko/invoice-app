import s from "./AppBar.module.scss";
import user_logo from "../../assets/user-logo.png";
import switch_mode_night_logo from "../../assets/switch-mode-night.svg";
import switch_mode_day_logo from "../../assets/switch-mode-day.svg";

import { useDispatch } from "react-redux";
import { toggleWorkMode } from "../../store/workMode/workModeActions";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {

    const isDarkMode = useDarkMode();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const root = document.querySelector(":root");
        root.style.setProperty("--body-background-color",
            `var(--body-background-color-${isDarkMode ? "dark" : "day"})`);
        root.style.setProperty("--slider-color",
            `var(--slider-color-${isDarkMode ? "dark" : "day"})`);
    }, [isDarkMode]);

    return (
        <div className={!isDarkMode ? s.appBar : s.appBar + " " + s.appBar_dark_mode}>
            <div className={s.logo} onClick={
                () => navigate("/invoices/")
            }></div>
            <div className={s.menu}>
                <div className={s.icon}>
                    <img
                        src={isDarkMode ? switch_mode_day_logo : switch_mode_night_logo}
                        alt="switch mode"
                        onClick={() => {
                            dispatch(toggleWorkMode());
                        }}
                    />
                </div>
                <div className={s.divider}></div>
                <div className={s.icon}>
                    <img src={user_logo} alt="user-icon" />
                </div>
            </div>
        </div>
    )
}

export default AppBar;
