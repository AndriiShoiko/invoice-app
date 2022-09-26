import Invoiceline from "../Invoiceline/Invoiceline";
import s from "./InvoiceList.module.scss";

function InvoiceList() {

    return (
        <div className={s.invoiceList}>
            <Invoiceline
                number="RT3080"
                date="Due  19 Aug 2021"
                customer="Jensen Huang"
                sum="£ 1,800.90"
                chip="Paid"
            />
            <Invoiceline
                number="RT3080"
                date="Due  19 Aug 2021"
                customer="Jensen Huang"
                sum="£ 1,800.90"
                chip="Paid"
            />
            <Invoiceline
                number="RT3080"
                date="Due  19 Aug 2021"
                customer="Jensen Huang"
                sum="£ 1,800.90"
                chip="Paid"
            />
        </div>
    )
}

export default InvoiceList;
