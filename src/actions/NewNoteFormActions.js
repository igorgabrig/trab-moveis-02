import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  }
}

export const NOTE_SAVED_SCCESS = 'NOTE_SAVED_SUCCESS';
export const noteSavedSuccess = () => {
  return {
    type: NOTE_SAVED_SCCESS
  }
}


export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = note => ({
  type: SET_ALL_FIELDS,
  note: note
})


export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

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




