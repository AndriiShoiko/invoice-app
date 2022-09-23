import { useDarkMode } from "../../hooks/useDarkMode";
import { useElementWidth } from "../../hooks/useElementWidth";
import ButtonNew from "../../UI/Buttons/ButtonNew/ButtonNew";
import SelectFilter from "../../UI/Selects/SelectFilter/SelectFilter";
import s from "./Header.module.scss";
import { MOBILE_WIDTH } from "../../const";

function Header() {

    const isDarkMode = useDarkMode();
    const [, width] = useElementWidth();

    return (
        <header className={!isDarkMode ? s.header : s.header + " " + s.header_dark_mode}>
            <div className={s.left_block}>
                <h1>Invoices</h1>
                <p> {width <= MOBILE_WIDTH ? "7 invoices" : "There are 7 total invoices"}</p>
            </div>
            <div className={s.right_block}>
                <SelectFilter>{width <= MOBILE_WIDTH ? "Filter" : "Filter by status"}</SelectFilter>
                <ButtonNew>{width <= MOBILE_WIDTH ? "New" : "New Invoice"}</ButtonNew>
            </div>
        </header>
    )
}

export default Header;
