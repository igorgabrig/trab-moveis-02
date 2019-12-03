import { SET_DEPUTADOS } from "../actions";


export default function(state = null,action){
    switch(action.type){
        case SET_DEPUTADOS:
            return action.deputados;
        default:
            return state;
    }
}