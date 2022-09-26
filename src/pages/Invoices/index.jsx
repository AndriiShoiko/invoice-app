import Header from "../../components/Header/Header";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import s from "./Invoices.module.scss";

function Invoices() {
    return (
        <div className={s.invoices}>
            <Header />
            <InvoiceList />
        </div>
    )
}

export default Invoices;
