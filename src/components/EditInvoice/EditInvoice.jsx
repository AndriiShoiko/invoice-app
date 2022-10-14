import s from "./EditInvoice.module.scss";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../UI/Buttons/ButtonMark/ButtonMark";
import InputForm from "../../UI/Inputs/InputForm/InputForm";
import DatePicker from "../../UI/Inputs/DatePicker/DatePicker";
import Select from "../../UI/Selects/Select/Select";
import ItemList from "../ItemList/ItemList";
import ButtonNewItem from "../../UI/Buttons/ButtonNewItem/ButtonNewItem";
import ButtonSave from "../../UI/Buttons/ButtonSave/ButtonSave";
import { useDarkMode } from "../../hooks/useDarkMode";

function EditInvoice({ active, setActive, newInvoice }) {

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

    function getCaption(newInvoice) {
        if (newInvoice) {
            return (
                <header className={s.number}>
                    New Invoice
                </header>
            );
        } else {
            return (
                <header className={s.number}>
                    Edit <span className={s.prefix}>#</span>XM9141
                </header>
            );
        }
    }

    function getCommandPanel(newInvoice) {
        if (newInvoice) {
            return (
                <div className={s.commandsNew}>
                    <ButtonEdit onClick={() => setActive(false)}>Discard</ButtonEdit>
                    <div className={s.save}>
                        <ButtonSave>Save as Draft</ButtonSave>
                        <ButtonMark onClick={() => setActive(false)}>Save & Send</ButtonMark>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={s.commands}>
                    <ButtonEdit onClick={() => setActive(false)}>Cancel</ButtonEdit>
                    <ButtonMark onClick={() => setActive(false)}>Save Changes</ButtonMark>
                </div>
            );
        }
    }

    return (
        <div className={getClasses(isDarkMode, active)}>
            <div className={s.editInvoice}>

                {getCaption(true)}

                <form className={s.form}>

                    <div className={s.caption}>Bill From</div>
                    <section className={s.bill_from}>
                        <div className={s.wrapper_input}>
                            <InputForm placeholder="Street Address" id="street_adress" error="false" />
                        </div>
                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm placeholder="City" id="city" error="false" />
                            </div>
                            <div className={s.input30}>
                                <InputForm placeholder="Post Code" id="post_code" error="false" />
                            </div>
                            <div className={s.input30}>
                                <InputForm placeholder="Country" id="country" error="false" />
                            </div>
                        </div>
                    </section>

                    <div className={s.caption}>Bill To</div>
                    <section className={s.bill_to}>
                        <div className={s.wrapper_input}>
                            <InputForm placeholder="Client’s Name" id="client_name" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm placeholder="Client’s Email" id="client_email" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm placeholder="Street Address" id="street_adress_to" error="false" />
                        </div>

                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm placeholder="City" id="city_to" error="false" />
                            </div>
                            <div className={s.input30}>
                                <InputForm placeholder="Post Code" id="post_code_to" error="false" />
                            </div>
                            <div className={s.input30}>
                                <InputForm placeholder="Country" id="country_to" error="false" />
                            </div>
                        </div>

                        <div className={s.date_payment}>
                            <div className={s.input50}>
                                <DatePicker placeholder="Invoice Date" id="invoice_date" error="true" />
                            </div>
                            <div className={s.input50}>
                                <Select readOnly={true} placeholder="Payment Terms" id="payment_terms" error="false" />
                            </div>
                        </div>

                        <div className={s.wrapper_input}>
                            <InputForm placeholder="Project Description" id="project_description" error="false" />
                        </div>
                    </section>
                    <section className={s.itemList}>
                        <div className={s.captionItemList}>Item List</div>
                        <div className={s.table}>
                            <ItemList />
                        </div>
                        <ButtonNewItem>+ Add New Item</ButtonNewItem>
                    </section>
                </form>

                {getCommandPanel(true)}
            </div>
        </div>
    )
}

export default EditInvoice;