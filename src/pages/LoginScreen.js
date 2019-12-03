import React from "react";
import { View, TextInput, StyleSheet, Button, ActivityIndicator, Text, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { processLogin } from '../actions';
import { connect } from 'react-redux';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            message: "",
        }
    }

    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyALzgxcj7Qo87r8jTaK8DMVyVD0y6qp70I",
            authDomain: "brasiliapp-852b6.firebaseapp.com",
            databaseURL: "https://brasiliapp-852b6.firebaseio.com",
            projectId: "brasiliapp-852b6",
            storageBucket: "brasiliapp-852b6.appspot.com",
            messagingSenderId: "390124370781",
            appId: "1:390124370781:web:8b39ea0fa8b32c169906b4",
            measurementId: "G-KYYECJ25TG"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

    }


    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    processLogin() {
        this.setState({ isLoading: true });
        const { email, password } = this.state;
        this.props.processLogin({ email, password })
            .then(user => {
                if (user) {
                    this.props.navigation.replace('Main');
                } else {

                    this.setState({
                        isLoading: false,
                        message: '',
                    })

                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getMessageByError(error.code),
                });
            })
    }

    getMessageByError(code) {
        switch (code) {
            case "auth/user-not-found":
                return "E-mail inexistente";
            case "auth/wrong-password":
                return "Senha Incorreta";
            default:
                return "Erro desconhecido";
        }
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }

        return (
            <Button
                title='Entrar'
                color ='black'
                onPress={() => this.processLogin()} />
        );
    }

    renderMessage() {
        const { message } = this.state;

        if (!message) {
            return null;
        }

        return (
            <View>
                <Text style={styles.Menssagem}>{message}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.containerForm}>
                    <Text style={styles.text}>Login</Text>
                    <FormRow>
                        <TextInput style={styles.TextInput}
                            placeholder="Digite aqui seu e-mail"
                            value={this.state.email}
                            autoCapitalize='none'
                            onChangeText={valor => { this.onChangeHandler('email', valor) }}
                            keyboardType="email-address"
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput style={styles.TextInput}
                            placeholder="Digite aqui sua senha"
                            secureTextEntry
                            value={this.state.password}
                            autoCapitalize='none'
                            onChangeText={valor => { this.onChangeHandler('password', valor) }}
                        />
                    </FormRow>

                </View>
                <View style={styles.botao}>
                    {this.renderButton()}
                </View>
                {this.renderMessage()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    containerForm: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 30,
    },
    TextInput: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        paddingVertical: 10,
        alignSelf: "stretch",
        padding: 25,
        width: 300,
    },
    text: {
        color: "black",
        fontSize: 23,
        fontWeight: "bold",
        textAlign: "center",
    },
    botao: {
        borderWidth: 2,
        backgroundColor: "black",
        borderColor: "white",
        width: 230,
        padding: 10,
        borderRadius: 20,
    },
    Menssagem: {
        color: 'white',
    }
});

export default connect(null, { processLogin })(LoginScreen);