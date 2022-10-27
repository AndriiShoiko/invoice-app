import s from "./ItemList.module.scss";
import { useDarkMode } from "../../hooks/useDarkMode";

function ItemList({ fields, register, remove, getValues, setValue, errors }) {

    const isDarkMode = useDarkMode();

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
        <table className={!isDarkMode ? s.itemList : s.itemList + " " + s.itemList_dark_mode}>
            <thead>
                <tr>
                    <th>
                        Item Name
                    </th>
                    <th>
                        QTY.
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Total
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {fields.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>
                                <input {...register(`items.${index}.name`, { required: true })}
                                />
                            </td>
                            <td>
                                <input type="number" step="any"
                                    {...register(`items.${index}.quantity`, { required: true })}
                                    onChange={(event) => handlerQuantity(index, event)} />
                            </td>
                            <td>
                                <input type="number" step="any" placeholder="0.00"
                                    {...register(`items.${index}.price`, { required: true })}
                                    onChange={(event) => handlerPrice(index, event)}
                                />
                            </td>
                            <td>
                                <input readOnly={true} type="number" step="any" placeholder="0.00"
                                    {...register(`items.${index}.total`, { required: true })}
                                />
                            </td>
                            <td onClick={() => remove(index)}>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default ItemList;