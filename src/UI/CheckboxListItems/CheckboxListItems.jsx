import CheckboxItem from "../CheckboxItem/CheckboxItem";
import s from "./CheckboxListItems.module.scss";
import { useDispatch } from "react-redux";
import { toggleSelectedStatus } from "../../store/slices/statusesSlice";

function CheckboxListItems({ statuses }) {

    const dispatch = useDispatch();

    function onChangeHandler(element) {
        dispatch(toggleSelectedStatus(element.target.id));
    }

    return (
        <div className={s.checkboxListItems}>
            {
                statuses.map((el) => {
                    return <CheckboxItem id={el.id} key={el.id} onChange={onChangeHandler}>{el.status}</CheckboxItem>
                })
            }
        </div>
    )
}

export default CheckboxListItems;
