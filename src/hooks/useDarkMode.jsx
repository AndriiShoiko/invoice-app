import { useSelector } from "react-redux";
import { getWorkMode } from "../store/WorkMode/WorkModeSelector";
import { DARK_MODE } from "../store/WorkMode/WorkModeConst";

export function useDarkMode() {
    const state = useSelector((store) => getWorkMode(store));
    return state.workMode === DARK_MODE;
}