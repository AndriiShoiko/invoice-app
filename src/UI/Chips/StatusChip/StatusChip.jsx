import s from "./StatusChip.module.scss";

function StatusChip(props) {

    let colorClass = undefined;

    if (props.children) {
        if (props.children.toLowerCase() === "paid") {
            colorClass = s.chip_paid;
        } else if (props.children.toLowerCase() === "pending") {
            colorClass = s.chip_pending;
        } else {
            colorClass = s.chip_draft;
        }
    }

    return (
        <div className={s.chip + " " + colorClass}>
            <ul>
                <li>
                    {props.children}
                </li>
            </ul>
        </div>
    )
}

export default StatusChip;
