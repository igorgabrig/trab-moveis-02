import { SET_NOTES } from "../actions";


export default function (state = null, action) {
    switch (action.type) {
        case SET_NOTES:
            console.log(action.notes);
            return action.notes;
        default:
            return state;
    }
}