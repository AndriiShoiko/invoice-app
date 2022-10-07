import s from "./CommandPanel.module.scss";
import StatusChip from "../../../UI/Chips/StatusChip/StatusChip";
import ButtonEdit from "../../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../../UI/Buttons/ButtonMark/ButtonMark";
import ButtonDelete from "../../../UI/Buttons/ButtonDelete/ButtonDelete";

import { useDarkMode } from "../../../hooks/useDarkMode";

function CommandPanel({ editHandler, deleteHandler }) {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.commandPanel : s.commandPanel + " " + s.commandPanel_dark_mode}>
            <div className={s.left_block}>
                <p>Status</p>
                <StatusChip>Pending</StatusChip>
            </div>
            <div className={s.right_block}>
                <ButtonEdit onClick={() => editHandler(true)}>Edit</ButtonEdit>
                <ButtonDelete  onClick={() => deleteHandler(true)}>Delete</ButtonDelete>
                <ButtonMark>Mark as Paid</ButtonMark>
            </div>
        </div>
    )
}

export default CommandPanel;
