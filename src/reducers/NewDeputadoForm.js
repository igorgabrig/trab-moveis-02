import { SET_FIELD, DEPUTADO_SAVED_SUCCESS, SET_ALL_FIELDS, RESET_FORM } from '../actions';
import deputadoReducer from './deputadoReducer';



const INITIAL_STATE = {
    id: null,
    name: '',
    partido: 'Avante',
    estado: 'AC',
    img: '',
    description: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FIELD:
            const clonedState = { ...state };
            clonedState[action.field] = action.value;
            return clonedState;
        case DEPUTADO_SAVED_SUCCESS:
            return INITIAL_STATE;
        case SET_ALL_FIELDS:
            return action.deputado;
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
}