import s from "./ItemListMobile.module.scss";
import ItemRow from "./ItemRow";

function ItemListMobile({ fields, register, remove, getValues, setValue, errors }) {
    return (
        <div className={s.itemListMobile}>
            {fields.map((item, index) => {
                return (
                    <ItemRow key={item.id} index={index} register={register} remove={remove} getValues={getValues} setValue={setValue} />
                )
            })}
        </div>
    )
}

export default ItemListMobile;
