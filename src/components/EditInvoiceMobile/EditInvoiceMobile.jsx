import { Link } from "react-router-dom";
import ButtonGoBack from "../../UI/Buttons/ButtonGoBack/ButtonGoBack";
import ButtonNewItem from "../../UI/Buttons/ButtonNewItem/ButtonNewItem";
import DatePicker from "../../UI/Inputs/DatePicker/DatePicker";
import InputForm from "../../UI/Inputs/InputForm/InputForm";
import Select from "../../UI/Selects/Select/Select";
import ItemListMobile from "../ItemListMobile/ItemListMobile";
import ButtonMark from "../../UI/Buttons/ButtonMark/ButtonMark";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonSave from "../../UI/Buttons/ButtonSave/ButtonSave";
import s from "./EditInvoiceMobile.module.scss";
import { useDarkMode } from "../../hooks/useDarkMode";

function EditInvoiceMobile({ newInvoice }) {

    const isDarkMode = useDarkMode();

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
                <section className={s.commandButtonsNew}>
                    <ButtonEdit>Discard</ButtonEdit>
                    <ButtonSave>Save as Draft</ButtonSave>
                    <ButtonMark>Save & Send</ButtonMark>
                </section>
            );
        } else {
            return (
            <section className={s.commandButtons}>
                <ButtonEdit>Cancel</ButtonEdit>
                <ButtonMark>Save Changes</ButtonMark>
            </section>
            );
        }
    }

    return (
        <div className={!isDarkMode ? s.editInvoiceMobile : s.editInvoiceMobile + " " + s.editInvoiceMobile_dark_mode}>
            <div className={s.wrapper}>
                <Link to="/invoices/RT3080">
                    <ButtonGoBack />
                </Link>
                {getCaption(newInvoice)}

                <form className={s.form}>
                    <div className={s.caption}>Bill From</div>
                    <section className={s.bill_from}>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Street Address" id="street_adress" error="false" />
                        </div>
                        <div className={s.city_code}>
                            <div className={s.input50}>
                                <InputForm labelText="City" id="city" error="false" />
                            </div>
                            <div className={s.input50}>
                                <InputForm labelText="Post Code" id="post_code" error="false" />
                            </div>
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Country" id="country" error="false" />
                        </div>
                    </section>
                    <div className={s.caption}>Bill To</div>
                    <section className={s.bill_to}>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Client’s Name" id="client_name" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Client’s Email" id="client_email" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Street Address" id="street_adress_to" error="false" />
                        </div>
                        <div className={s.city_code}>
                            <div className={s.input50}>
                                <InputForm labelText="City" id="city_to" error="false" />
                            </div>
                            <div className={s.input50}>
                                <InputForm labelText="Post Code" id="post_code_to" error="false" />
                            </div>
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Country" id="country_to" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <DatePicker labelText="Invoice Date" id="invoice_date" error="true" />
                        </div>
                        <div className={s.wrapper_input}>
                            <Select readOnly={true} placeholder="Payment Terms" id="payment_terms" error="false" />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm labelText="Project Description" id="project_description" error="false" />
                        </div>
                    </section>
                    <section className={s.itemList}>
                        <div className={s.captionItemList}>Item List</div>
                        <ItemListMobile />
                        <ButtonNewItem>+ Add New Item</ButtonNewItem>
                        <div className={s.shadowBlock}></div>
                    </section>
                    {getCommandPanel(newInvoice)}
                </form>
            </div>
        </div>
    )
}

export default EditInvoiceMobile;
