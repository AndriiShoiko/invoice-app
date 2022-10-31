import Header from "../Header/Header";
import Invoiceline from "../Invoiceline/Invoiceline";
import s from "./InvoiceList.module.scss";
import InvoiceListVoid from "./InvoiceListVoid";
import NewInvoice from "../EditInvoice/NewInvoice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoicesSelector, loadInvoices, STATUS_LOADING, STATUS_IDLE } from "../../store/slices/invoicesSlice";
import { formatFieldToDate, formatFieldToSum } from "../../utils/formatting";
import InvoiceListSkeleton from "./InvoiceListSkeleton";

function InvoiceList({ newInvoice }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(loadInvoices());
        return () => {
            promise.abort();
        }
    }, [dispatch]);


    function returnList() {
        return (
            <div className={s.invoiceList}>
                {invoices.entities.map((item) => {
                    return <Invoiceline
                        id={item.id}
                        key={item.id}
                        number={item.number}
                        date={"Due " + formatFieldToDate(item.paymentDue)}
                        customer={item.clientName}
                        sum={formatFieldToSum(item.total)}
                        chip={item.status}
                    />
                })}
            </div>
        );
    }

    function returnVoidList() {
        return (
            <div className={s.invoiceList}>
                <InvoiceListVoid />
            </div>
        );
    }

    function showSkeleton() {
        return (
            <div className={s.invoiceList}>
                <InvoiceListSkeleton />
            </div>
        );
    }

    function showComponent() {
        if (invoices.loading === STATUS_LOADING) {
            return showSkeleton();
        }
        if (invoices.loading === STATUS_IDLE) {
            return totalInvoises === 0 ? returnVoidList() : returnList();
        }
    }

    const invoices = useSelector(state => invoicesSelector(state));
    const totalInvoises = invoices.entities.length;

    return (
        <div className={s.wrapper}>
            <Header />
            {newInvoice && <NewInvoice />}
            {showComponent()}
        </div>
    )
}

export default InvoiceList;
