import s from "./EditInvoice.module.scss";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../UI/Buttons/ButtonMark/ButtonMark";

function EditInvoice({ active, setActive }) {

    return (
        <div className={active ? s.wrapper + " " + s.active : s.wrapper}>
            <div className={s.editInvoice}>
                <header className={s.number}>
                    Edit <span className={s.prefix}>#</span> XM9141
                </header>

                <h3 className={s.bill_from}>Bill From</h3>
                <form className={s.form}>

                </form>

                <div className={s.commands}>
                    <ButtonEdit onClick={() => setActive(false)}>Cancel</ButtonEdit>
                    <ButtonMark onClick={() => setActive(false)}> Save Changes</ButtonMark>
                </div>
            </div>
        </div>
    )
}

export default EditInvoice;
