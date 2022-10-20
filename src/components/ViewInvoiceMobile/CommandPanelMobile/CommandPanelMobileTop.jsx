import s from "./CommandPanelMobile.module.scss";
import StatusChip from "../../../UI/Chips/StatusChip/StatusChip";
import { useDarkMode } from "../../../hooks/useDarkMode";

function CommandPanelMobileTop({ status }) {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.commandPanelTop : s.commandPanelTop + " " + s.commandPanelTop_dark_mode}>
            <div className={s.top_block}>
                <p>Status</p>
                <StatusChip>{status}</StatusChip>
            </div>
        </div>
    )
}

export default CommandPanelMobileTop;