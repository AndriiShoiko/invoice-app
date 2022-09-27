import s from "./InvoiceList.module.scss";
import svg from "../../assets/email-flatline.svg";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Link } from "react-router-dom";

function InvoiceListVoid() {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.invoiceListVoid : s.invoiceListVoid + " " + s.invoiceListVoid_dark_mode}>
            <img src={svg} alt="email-flatline.svg" className={s.email} />
            <h3 className={s.title}>There is nothing here</h3>
            <p className={s.description}>Create an invoice by clicking the</p>
            <p className={s.description}> <Link to="/invoices/new">New Invoice</Link> button and get started</p>
        </div>
    )
}

export default InvoiceListVoid;
