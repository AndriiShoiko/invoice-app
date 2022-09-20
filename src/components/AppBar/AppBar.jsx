import s from "./AppBar.module.scss";
import user_logo from "../../assets/user-logo.png";
import switch_mode_night_logo from "../../assets/switch-mode-night.svg";

function AppBar() {
    return (
        <div className={s.appBar}>
            <div className={s.logo}></div>
            <div className={s.menu}>
                <div className={s.icon}>
                    <img src={switch_mode_night_logo} alt="switch mode" />
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
