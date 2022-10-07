import InputForm from "../../UI/Inputs/InputForm/InputForm";
import s from "./ItemListMobile.module.scss";

function ItemRow() {
    return (
        <div className={s.itemRow}>
            <div className={s.wrapper_input}>
                <InputForm placeholder="Item Name" id={"item_name1"} error="false" />
            </div>
            <div className={s.qtyPriceTotal}>
                <div className={s.qtyPrice}>
                    <div className={s.input40}>
                        <InputForm placeholder="Qty." id={"qty1"} error="false" />
                    </div>
                    <div className={s.input60}>
                        <InputForm placeholder="Price" id={"price1"} error="false" />
                    </div>
                </div>
                <div className={s.rightPart}>
                    <div className={s.total}>
                        <p className={s.caption}>Total</p>
                    </div>
                    <div className={s.row}>
                        <p className={s.sum}>156.00</p>
                        <div className={s.trash}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemRow;
