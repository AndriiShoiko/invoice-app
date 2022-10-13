import { useSelector } from "react-redux";
import { workModeSelector } from "../store/slices/workModeSlice";
import { DARK_MODE } from "../store/slices/workModeSlice";

export function useDarkMode() {
    const workMode = useSelector((store) => workModeSelector(store));
    return workMode === DARK_MODE;
}