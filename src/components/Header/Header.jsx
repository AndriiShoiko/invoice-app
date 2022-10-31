import { useDarkMode } from "../../hooks/useDarkMode";
import { useElementWidth } from "../../hooks/useElementWidth";
import ButtonNew from "../../UI/Buttons/ButtonNew/ButtonNew";
import SelectFilter from "../../UI/Selects/SelectFilter/SelectFilter";
import s from "./Header.module.scss";
import { MOBILE_WIDTH } from "../../const";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, statusesSelector, toggleSelectedStatus } from "../../store/slices/statusesSlice";
import { invoicesSelector, loadInvoicesByFilters } from "../../store/slices/invoicesSlice";

function Header() {

    const isDarkMode = useDarkMode();
    const [, width] = useElementWidth();

    const dispatch = useDispatch();

    const statuses = useSelector(state => statusesSelector(state));
    const invoices = useSelector(state => invoicesSelector(state));

    let totalInvoises = invoices.entities.length;
    if (!totalInvoises) {
        totalInvoises = 0;
    }

    function onChangeHandlerFilter(element) {
        dispatch(toggleSelectedStatus(element.target.id));
        dispatch(loadInvoicesByFilters());
    }

    useEffect(() => {
        const promise = dispatch(loadStatuses());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return (
        <header className={!isDarkMode ? s.header : s.header + " " + s.header_dark_mode}>
            <div className={s.left_block}>
                <h1>Invoices</h1>
                <p> {width <= MOBILE_WIDTH ? `${totalInvoises} invoices` : `There are ${totalInvoises} total invoices`}</p>
            </div>
            <div className={s.right_block}>
                <SelectFilter statuses={statuses.entities} onChange={onChangeHandlerFilter}>
                    {width <= MOBILE_WIDTH ? "Filter" : "Filter by status"}
                </SelectFilter>
                <Link to="/invoices/new">
                    <ButtonNew>{width <= MOBILE_WIDTH ? "New" : "New Invoice"}</ButtonNew>
                </Link>
            </div>
        </header>
    )
}

export default Header;
