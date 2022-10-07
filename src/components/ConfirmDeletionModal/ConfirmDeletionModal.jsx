import { useDarkMode } from "../../hooks/useDarkMode";
import ButtonDelete from "../../UI/Buttons/ButtonDelete/ButtonDelete";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import s from "./ConfirmDeletionModal.module.scss";

function ConfirmDeletionModal({ active, setActive }) {

    const isDarkMode = useDarkMode();

    function getClasses(isDarkMode, active) {
        if (isDarkMode) {
            if (active) {
                return s.wrapper + " " + s.wrapper_dark_mode + " " + s.active;
            } else {
                return s.wrapper + " " + s.wrapper_dark_mode;
            }
        } else {
            return active ? s.wrapper + " " + s.active : s.wrapper;
        }
    }

    return (
        <div className={getClasses(isDarkMode, active)}>
            <div className={s.confirm}>
                <h2 className={s.caption}>Confirm Deletion</h2>
                <p className={s.description}>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
                <div className={s.commands}>
                    <ButtonEdit onClick={() => setActive(false)}>Cancel</ButtonEdit>
                    <ButtonDelete>Delete</ButtonDelete>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeletionModal;
