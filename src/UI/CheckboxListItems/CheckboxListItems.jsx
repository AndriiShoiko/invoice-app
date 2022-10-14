import CheckboxItem from "../CheckboxItem/CheckboxItem";
import s from "./CheckboxListItems.module.scss";

function CheckboxListItems({ statuses, onChange }) {

    return (
        <div className={s.checkboxListItems}>
            {
                statuses.map((el) => {
                    return <CheckboxItem id={el.id} key={el.id} onChange={onChange}>{el.status}</CheckboxItem>
                })
            }
        </div>
    )
}

export default CheckboxListItems;
