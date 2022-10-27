import InputForm from "../../UI/Inputs/InputForm/InputForm";
import s from "./ItemListMobile.module.scss";

function ItemRow({ register, remove, index, getValues, setValue }) {

    function handlerQuantity(index, event) {
        const qty = Number(event.target.value);
        const price = Number(getValues(`items.${index}.price`));

        setValue(`items.${index}.total`, qty * price);
    }

    function handlerPrice(index, event) {
        const price = Number(event.target.value);
        const qty = Number(getValues(`items.${index}.quantity`));

        setValue(`items.${index}.total`, qty * price);
    }

    return (
        <div className={s.itemRow}>
            <div className={s.wrapper_input}>
                <InputForm labelText="Item Name" register={register(`items.${index}.name`, { required: true })} />
            </div>
            <div className={s.qtyPriceTotal}>
                <div className={s.qtyPrice}>
                    <div className={s.input30}>
                        <InputForm type="number" step="any" labelText="Qty."
                            register={register(`items.${index}.quantity`, { required: true })}
                            onChange={(event) => handlerQuantity(index, event)}
                        />
                    </div>
                    <div className={s.input40}>
                        <InputForm labelText="Price" type="number" step="any"
                            register={register(`items.${index}.price`, { required: true })}
                            onChange={(event) => handlerPrice(index, event)}
                        />
                    </div>
                    <div className={s.input30 + " " + s.total}>
                        <InputForm labelText="Total" type="number" step="any" readOnly={true} register={register(`items.${index}.total`, { required: true })} />
                    </div>
                </div>
                <div className={s.rightPart}>
                    <div className={s.trash} onClick={() => remove(index)}></div>
                </div>
            </div>
        </div>
    )
}

export default ItemRow;
