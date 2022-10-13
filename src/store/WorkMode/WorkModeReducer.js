
import { TOGGLE_MODE, DARK_MODE, DAY_MODE } from "./workModeConst";

export function workModeReducer(state = DAY_MODE, action) {

    if (action.type === TOGGLE_MODE) {
        return state === DAY_MODE ? DARK_MODE : DAY_MODE;
    }

    return state;

}