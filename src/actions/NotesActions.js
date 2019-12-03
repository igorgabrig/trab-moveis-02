import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_NOTES = 'SET_NOTES';
const setNotes = notes => ({
    type: SET_NOTES,
    notes: notes
})

export const watchNotes = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/notes`)
            .on('value', snapshot => {
                const notes = snapshot.val();
                const action = setNotes(notes);
                dispatch(action);
            })
    }
}

export const deleteNote = note => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Excluir',
                `Deseja realmente excluir esta série ${note.title} ?`,
                [{
                    text: 'Não',
                    onPress: () => {
                        resolve(false)
                    },
                    style: 'cancel'
                }, {
                    text: 'sim',
                    onPress: async () => {
                        const { currentUser } = firebase.auth();
                        try {
                            await firebase
                                .database()
                                .ref(`/users/${currentUser.uid}/notes/${note.id}`)
                                .remove();

                            resolve(true);
                        } catch (e) {
                            reject(e);
                        }
                    }
                }],
                { cancelable: false }

            )
        })
    }
}
