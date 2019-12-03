import { combineReducers } from 'redux';
import userReducer from './userReducer';
import NewDeputadoForm from './NewDeputadoForm';
import deputadoReducer from './deputadoReducer';
import NewNoteForm from './NewNoteForm';
import noteReducer from './noteReducer';


export default combineReducers({
    user: userReducer,
    deputadoForm: NewDeputadoForm,
    listaDeputados: deputadoReducer,
    //noteForm: NewNoteForm,
    listaNotes: noteReducer,

})