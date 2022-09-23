import CheckboxItem from "../CheckboxItem/CheckboxItem";
import s from "./CheckboxListItems.module.scss";

function CheckboxListItems() {

    return (
        <div className={s.checkboxListItems}>
            <CheckboxItem id="1">Draft</CheckboxItem>
            <CheckboxItem id="2">Pending</CheckboxItem>
            <CheckboxItem id="3">Paid</CheckboxItem>
        </div>
    )
}

export default CheckboxListItems;
