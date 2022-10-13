import { useSelector } from "react-redux";
import { getWorkMode } from "../store/workMode/workModeSelector";
import { DARK_MODE } from "../store/workMode/workModeConst";

export function useDarkMode() {
    const state = useSelector((store) => getWorkMode(store));
    return state.workMode === DARK_MODE;
}