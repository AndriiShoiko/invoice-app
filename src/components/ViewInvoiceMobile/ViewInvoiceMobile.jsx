import s from "./ViewInvoiceMobile.module.scss";
import ButtonGoBack from "../../UI/Buttons/ButtonGoBack/ButtonGoBack";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommandPanelMobileTop from "./CommandPanelMobile/CommandPanelMobileTop";
import CommandPanelMobileBottom from "./CommandPanelMobile/CommandPanelMobileBottom";
import { useState } from "react";
import ConfirmDeletionModal from "../ConfirmDeletionModal/ConfirmDeletionModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoiceById, invoicesSelectorById, removeInvoice, invoicesIsErrorSelector, updateInvoiceById } from "../../store/slices/invoicesSlice";
import { formatFieldToDate, formatFieldToSum } from "../../utils/formatting";

function ViewInvoiceMobile() {

    const isDarkMode = useDarkMode();
    const [deleteActive, setdeleteActive] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(loadInvoiceById(id));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    const isError = useSelector(state => invoicesIsErrorSelector(state));
    const navigate = useNavigate();

    if (confirmDelete) {
        dispatch(removeInvoice(id));
        if (!isError) {
            navigate(`/invoice-app`);
        }
    }

    const dataInvoice = useSelector(state => invoicesSelectorById(state, id));

    if (!dataInvoice || confirmDelete) {
        return null;
    }    

    function markAsPaidHandler() {

        let dataToSend = { ...dataInvoice };
        dataToSend.status = "paid";

        dispatch(updateInvoiceById({ id, data: dataToSend }));
    }

    return (
        <>
            <div className={!isDarkMode ? s.editInvoice : s.editInvoice + " " + s.editInvoice_dark_mode}>
                <Link to="/invoice-app">
                    <ButtonGoBack />
                </Link>
                <CommandPanelMobileTop status={dataInvoice.status} />
                <ConfirmDeletionModal active={deleteActive} setActive={setdeleteActive} setConfirmDelete={setConfirmDelete} />
                <div className={s.details}>

                    <div className={s.head}>
                        <div className={s.left_part}>
                            <h2 className={s.number}><span>#</span>{dataInvoice.number}</h2>
                            <p className={s.service}>{dataInvoice.description}</p>
                        </div>
                        <div className={s.right_part}>
                            <p className={s.street}>{dataInvoice.senderAddress.street}</p>
                            <p className={s.sity}>{dataInvoice.senderAddress.city}</p>
                            <p className={s.index}>{dataInvoice.senderAddress.postCode}</p>
                            <p className={s.country}>{dataInvoice.senderAddress.country}</p>
                        </div>
                    </div>

                    <div className={s.info}>
                        <div className={s.first_part}>
                            <div className={s.invoice_date}>
                                <h3 className={s.invoice_date_caption + " " + s.caption}>Invoice Date</h3>
                                <p className={s.invoice_date + " " + s.fields}>{formatFieldToDate(dataInvoice.createdAt)}</p>
                            </div>
                            <div className={s.payment_due}>
                                <h3 className={s.payment_due_caption + " " + s.caption}>Payment Due</h3>
                                <p className={s.payment_due + " " + s.fields}>{formatFieldToDate(dataInvoice.paymentDue)}</p>
                            </div>
                        </div>
                        <div className={s.middle_part}>
                            <h3 className={s.bill_to_caption + " " + s.caption}>Bill To</h3>
                            <p className={s.bill_to + " " + s.fields}>{dataInvoice.clientName}</p>
                            <div className={s.bill_adress}>
                                <p className={s.bill_street}>{dataInvoice.clientAddress.street}</p>
                                <p className={s.bill_sity}>{dataInvoice.clientAddress.city}</p>
                                <p className={s.bill_index}>{dataInvoice.clientAddress.postCode}</p>
                                <p className={s.bill_country}>{dataInvoice.clientAddress.country}</p>
                            </div>
                        </div>
                        <div className={s.finally_part}>
                            <h3 className={s.sent_to_caption + " " + s.caption}>Sent to</h3>
                            <p className={s.sent_to + " " + s.fields}>{dataInvoice.clientEmail}</p>
                        </div>
                    </div>

                    <div className={s.list_of_services}>

                        {dataInvoice.items.map((el, index) => {
                            return (
                                <div className={s.service} key={index}>
                                    <div className={s.left_part}>
                                        <h3 className={s.name}>{el.name}</h3>
                                        <p className={s.count}>{el.quantity} x {formatFieldToSum(el.price)}</p>
                                    </div>
                                    <div className={s.right_part}>
                                        {formatFieldToSum(el.total)}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className={s.foot}>
                        <p className={s.ammount}>Amount Due</p>
                        <p className={s.sum}>{formatFieldToSum(dataInvoice.total)}</p>
                    </div>

                </div>
            </div>
            <CommandPanelMobileBottom deleteHandler={setdeleteActive} id={id} status={dataInvoice.status} markAsPaidHandler={markAsPaidHandler}/>
        </>
    )

}

export default ViewInvoiceMobile;
