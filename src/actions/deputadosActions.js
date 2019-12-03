import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_DEPUTADOS = 'SET_DEPUTADOS';
const setdeputados = deputados => ({
    type: SET_DEPUTADOS,
    deputados: deputados
})

export const watchDeputados = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/deputados`)
            .on('value', snapshot => {
                const deputados = snapshot.val();
                const action = setdeputados(deputados);
                dispatch(action);
            })
    }
}

export const deleteDeputado = deputado => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Excluir',
                `Deseja realmente excluir o deputado ${deputado.name} ?`,
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
                                .ref(`/users/${currentUser.uid}/deputados/${deputado.id}`)
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
