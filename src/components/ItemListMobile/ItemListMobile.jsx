import s from "./ItemListMobile.module.scss";
import ItemRow from "./ItemRow";

function ItemListMobile() {
    return (
        <div className={s.itemListMobile}>
            <ItemRow />
            <ItemRow />
        </div>
    )
}

export default ItemListMobile;
