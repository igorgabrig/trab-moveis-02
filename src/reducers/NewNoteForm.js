import { SET_FIELD, NOTE_SAVED_SUCCESS, SET_ALL_FIELDS, RESET_FORM } from '../actions';
import noteReducer from './noteReducer';



const INITIAL_STATE = {
    id: null,
    title: '',
    name:'',
    rate: 0,
    description: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const clonedState = { ...state };
            clonedState[action.field] = action.value;
            return clonedState;
        case NOTE_SAVED_SUCCESS:
            return INITIAL_STATE;
        case SET_ALL_FIELDS:
            return action.note;
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
}