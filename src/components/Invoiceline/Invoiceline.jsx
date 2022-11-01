import StatusChip from "../../UI/Chips/StatusChip/StatusChip";
import s from "./Invoiceline.module.scss";
import invoice_svg from "../../assets/invoice-arrow.svg";

import { useDarkMode } from "../../hooks/useDarkMode";
import { useElementWidth } from "../../hooks/useElementWidth";
import { MOBILE_WIDTH } from "../../const";
import { useNavigate } from "react-router-dom";

function Invoiceline(props) {

    const { number, date, customer, sum, chip, id } = props;

    const isDarkMode = useDarkMode();
    const [, width] = useElementWidth();

    const navigate = useNavigate();
    return (
        <div className={!isDarkMode ? s.invoiceline : s.invoiceline + " " + s.invoiceline_dark_mode}
            onClick={
                () => navigate("/invoice-app/" + id)
            }>
            <div className={s.left_block}>
                <div className={s.number}>
                    <span className={s.prefix}>
                        #
                    </span>
                    {number}
                </div>
                <div className={s.date}>{date}</div>
                {width <= MOBILE_WIDTH ? <div className={s.sum}>{sum}</div> : <div className={s.customer}>{customer}</div>}
            </div>
            <div className={s.right_block}>
                {width <= MOBILE_WIDTH ? <div className={s.customer}>{customer}</div> : <div className={s.sum}>{sum}</div>}
                <div className={s.chip_and_row}>
                    <div className={s.chip}>
                        <StatusChip>{chip}</StatusChip>
                    </div>
                    <img src={invoice_svg} alt="invoice-svg" className={s.row} />
                </div>
            </div>
        </div>
    )
}

export default Invoiceline;
