import s from "./ViewInvoice.module.scss";
import ButtonGoBack from "../../UI/Buttons/ButtonGoBack/ButtonGoBack";
import CommandPanel from "./CommandPanel";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Link } from "react-router-dom";

function ViewInvoice() {

    const isDarkMode = useDarkMode();

    return (
        <div className={!isDarkMode ? s.editInvoice : s.editInvoice + " " + s.editInvoice_dark_mode}>
            <Link to="/invoices">
                <ButtonGoBack />
            </Link>
            <CommandPanel />

            <div className={s.details}>

                <div className={s.head}>
                    <div className={s.left_part}>
                        <h2 className={s.number}><span>#</span>XM9141</h2>
                        <p className={s.service}>Graphic Design</p>
                    </div>
                    <div className={s.right_part}>
                        <p className={s.street}>19 Union Terrace</p>
                        <p className={s.sity}>London</p>
                        <p className={s.index}>E1 3EZ</p>
                        <p className={s.country}>United Kingdom</p>
                    </div>
                </div>

                <div className={s.info}>
                    <div className={s.first_part}>
                        <div className={s.invoice_date}>
                            <h3 className={s.invoice_date_caption + " " + s.caption}>Invoice Date</h3>
                            <p className={s.invoice_date + " " + s.fields}>21 Aug 2021</p>
                        </div>
                        <div className={s.payment_due}>
                            <h3 className={s.payment_due_caption + " " + s.caption}>Payment Due</h3>
                            <p className={s.payment_due + " " + s.fields}>20 Sep 2021</p>
                        </div>
                    </div>
                    <div className={s.middle_part}>
                        <h3 className={s.bill_to_caption + " " + s.caption}>Bill To</h3>
                        <p className={s.bill_to + " " + s.fields}>Alex Grim</p>
                        <div className={s.bill_adress}>
                            <p className={s.bill_street}>84 Church Way</p>
                            <p className={s.bill_sity}>Bradford</p>
                            <p className={s.bill_index}>BD1 9PB</p>
                            <p className={s.bill_country}>United Kingdom</p>
                        </div>
                    </div>
                    <div className={s.finally_part}>
                        <h3 className={s.sent_to_caption + " " + s.caption}>Sent to</h3>
                        <p className={s.sent_to + " " + s.fields}>alexgrim@mail.com</p>
                    </div>
                </div>

                <div className={s.list_of_services}>
                    <table className={s.table_services}>
                        <thead>
                            <tr>
                                <th>
                                    Item Name
                                </th>
                                <th>
                                    QTY.
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Banner Design
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    £ 156.00
                                </td>
                                <td>
                                    £ 156.00
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email Design
                                </td>
                                <td>
                                    2
                                </td>
                                <td>
                                    £ 200.00
                                </td>
                                <td>
                                    £ 400.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={s.foot}>
                    <p className={s.ammount}>Amount Due</p>
                    <p className={s.sum}>£ 556.00</p>
                </div>

            </div>

        </div>
    )
}

export default ViewInvoice;