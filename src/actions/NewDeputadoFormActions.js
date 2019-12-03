import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  }
}

export const DEPUTADO_SAVED_SCCESS = 'DEPUTADO_SAVED_SUCCESS';
export const deputadoSavedSuccess = () => {
  return {
    type: DEPUTADO_SAVED_SCCESS
  }
}

export const NOTE_SAVED_SCCESS = 'NOTE_SAVED_SUCCESS';
export const noteSavedSuccess = () => {
  return {
    type: NOTE_SAVED_SCCESS
  }
}


export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = deputado => ({
  type: SET_ALL_FIELDS,
  deputado: deputado
})


export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

export const saveDeputado = deputado => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (deputado.id) {

      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/deputados/${deputado.id}`)
        .set(deputado);

    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/deputados`)
        .push(deputado);
    }

    dispatch(deputadoSavedSuccess());
  }
}




export const saveNote = note => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (note.id) {

      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/notes/${note.id}`)
        .set(note);

    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/notes`)
        .push(note);
    }

    dispatch(noteSavedSuccess());
  }
}