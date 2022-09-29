import s from "./CommandPanelMobile.module.scss";
import ButtonEdit from "../../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../../UI/Buttons/ButtonMark/ButtonMark";
import ButtonDelete from "../../../UI/Buttons/ButtonDelete/ButtonDelete";

import { useDarkMode } from "../../../hooks/useDarkMode";

export function CommandPanelMobileBottom() {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.commandPanelBottom : s.commandPanelBottom + " " + s.commandPanelBottom_dark_mode}>
            <div className={s.bottom_block}>
                <ButtonEdit>Edit</ButtonEdit>
                <ButtonDelete>Delete</ButtonDelete>
                <ButtonMark>Mark as Paid</ButtonMark>
            </div>
        </div>
    )
}

export default CommandPanelMobileBottom;