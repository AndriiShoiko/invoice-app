import s from "./CommandPanelMobile.module.scss";
import ButtonEdit from "../../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../../UI/Buttons/ButtonMark/ButtonMark";
import ButtonDelete from "../../../UI/Buttons/ButtonDelete/ButtonDelete";

import { useDarkMode } from "../../../hooks/useDarkMode";
import { Link } from "react-router-dom";

export function CommandPanelMobileBottom({ deleteHandler, id }) {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.commandPanelBottom : s.commandPanelBottom + " " + s.commandPanelBottom_dark_mode}>
            <div className={s.bottom_block}>
                <Link to={`/invoices/${id}/edit`}>
                    <ButtonEdit>Edit</ButtonEdit>
                </Link>
                <ButtonDelete onClick={() => deleteHandler(true)}>Delete</ButtonDelete>
                <ButtonMark>Mark as Paid</ButtonMark>
            </div>
        </div>
    )
}

export default CommandPanelMobileBottom;