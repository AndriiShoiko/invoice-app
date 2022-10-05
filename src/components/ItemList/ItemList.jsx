import s from "./ItemList.module.scss";
import {useDarkMode} from "../../hooks/useDarkMode";

function ItemList() {

    const isDarkMode = useDarkMode();

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
                <tr>
                    <td>
                        Banner Design
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        156.00
                    </td>
                    <td>
                        156.00
                    </td>
                    <td>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        Email Design
                    </td>
                    <td>
                        2
                    </td>
                    <td>
                        200.00
                    </td>
                    <td>
                        400.00
                    </td>
                    <td>                        
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ItemList;