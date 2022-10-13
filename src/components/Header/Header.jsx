import { useDarkMode } from "../../hooks/useDarkMode";
import { useElementWidth } from "../../hooks/useElementWidth";
import ButtonNew from "../../UI/Buttons/ButtonNew/ButtonNew";
import SelectFilter from "../../UI/Selects/SelectFilter/SelectFilter";
import s from "./Header.module.scss";
import { MOBILE_WIDTH } from "../../const";
import { Link } from "react-router-dom";
import { } from "redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, statusesSelector } from "../../store/slices/statusesSlice";

function Header() {

    const isDarkMode = useDarkMode();
    const [, width] = useElementWidth();

    const dispatch = useDispatch();
    const statuses = useSelector(state => statusesSelector(state));

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
                <p> {width <= MOBILE_WIDTH ? "7 invoices" : "There are 7 total invoices"}</p>
            </div>
            <div className={s.right_block}>
                <SelectFilter statuses = {statuses.entities}>{width <= MOBILE_WIDTH ? "Filter" : "Filter by status"}</SelectFilter>
                <Link to="/invoices/new">
                    <ButtonNew>{width <= MOBILE_WIDTH ? "New" : "New Invoice"}</ButtonNew>
                </Link>
            </div>
        </header>
    )
}

export default Header;
