import React from 'react';
import { StyleSheet, View, Text, TextInput, Picker, Slider, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setField, saveDeputado, setAllFields, resetForm } from '../actions/NewDeputadoFormActions';


class NewDeputadoScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {

        const { navigation, setAllFields, resetForm } = this.props;
        const { params } = navigation.state;

        if (params && params.deputadoToEdit) {
            setAllFields(params.deputadoToEdit)
        } else {
            resetForm();
        }
    }

    render() {
        const { deputadoForm, setField, saveDeputado, navigation } = this.props;

        return (
            <ScrollView>
                <View style={styles.Form}>
                    <FormRow style={styles.Form}>
                        <TextInput style={styles.TextInput}
                            placeholder="Nome do Deputado"
                            value={deputadoForm.name}
                            onChangeText={value => setField('name', value)}
                        />
                    </FormRow>
                </View>
                <View style={styles.Form}>

                    <FormRow style={styles.Form}>
                        <TextInput style={styles.TextInput}
                            placeholder="URL da imagem"
                            value={deputadoForm.img}
                            onChangeText={value => setField('img', value)}
                        />
                    </FormRow>
                </View>
                <View style={styles.Form}>

                    <FormRow style={styles.Form}>
                        <Picker
                            selectedValue={deputadoForm.partido}
                            onValueChange={itemValue => {
                                setField('partido', itemValue)
                            }
                            }>
                            <Picker.Item label="Avante" value="Avante" />
                            <Picker.Item label="Cidadania" value="Cidadania" />
                            <Picker.Item label="DC" value="DC" />
                            <Picker.Item label="DEM" value="DEM" />
                            <Picker.Item label="MDB" value="MDB" />
                            <Picker.Item label="Republicanos" value="Republicanos" />
                            <Picker.Item label="Patriota" value="Patriota" />
                            <Picker.Item label="Solidariedade" value="Solidariedade" />
                            <Picker.Item label="NOVO" value="NOVO" />
                            <Picker.Item label="PCB" value="PCB" />
                            <Picker.Item label="PCdoB" value="PCdoB" />
                            <Picker.Item label="PCO" value="PCO" />
                            <Picker.Item label="PDT" value="PDT" />
                            <Picker.Item label="PL" value="PL" />
                            <Picker.Item label="PMB" value="PMB" />
                            <Picker.Item label="PMN" value="PMN" />
                            <Picker.Item label="PODE" value="PODE" />
                            <Picker.Item label="PP" value="PP" />
                            <Picker.Item label="PROS" value="PROS" />
                            <Picker.Item label="PRTB" value="PRTB" />
                            <Picker.Item label="PSB" value="PSB" />
                            <Picker.Item label="PSC" value="PSC" />
                            <Picker.Item label="PSD" value="PSD" />
                            <Picker.Item label="PSDB" value="PSDB" />
                            <Picker.Item label="PSL" value="PSL" />
                            <Picker.Item label="PSOL" value="PSOL" />
                            <Picker.Item label="PSTU" value="PSTU" />
                            <Picker.Item label="PT" value="PT" />
                            <Picker.Item label="PTB" value="PTB" />
                            <Picker.Item label="PTC" value="PTC" />
                            <Picker.Item label="PV" value="PV" />
                            <Picker.Item label="REDE" value="REDE" />

                        </Picker>
                    </FormRow>
                </View>
                <View style={styles.Form}>

                    <FormRow style={styles.Form}>

                        <View style={styles.estado}>
                            <Text>Estado: </Text>
                        </View>
                        <Picker
                            selectedValue={deputadoForm.estado}
                            onValueChange={itemValue => {
                                setField('estado', itemValue)
                            }
                            }>
                            <Picker.Item label="AC" value="AC" />
                            <Picker.Item label="AL" value="AL" />
                            <Picker.Item label="AP" value="AP" />
                            <Picker.Item label="AM" value="AM" />
                            <Picker.Item label="BA" value="BA" />
                            <Picker.Item label="CE" value="CE" />
                            <Picker.Item label="DF" value="DF" />
                            <Picker.Item label="ES" value="ES" />
                            <Picker.Item label="GO" value="GO" />
                            <Picker.Item label="MA" value="MA" />
                            <Picker.Item label="MT" value="MT" />
                            <Picker.Item label="MS" value="MS" />
                            <Picker.Item label="MG" value="MG" />
                            <Picker.Item label="PA" value="PA" />
                            <Picker.Item label="PB" value="PB" />
                            <Picker.Item label="PR" value="PR" />
                            <Picker.Item label="PE" value="PE" />
                            <Picker.Item label="PI" value="PI" />
                            <Picker.Item label="RJ" value="RJ" />
                            <Picker.Item label="RN" value="RN" />
                            <Picker.Item label="RS" value="RS" />
                            <Picker.Item label="RO" value="RO" />
                            <Picker.Item label="RR" value="RR" />
                            <Picker.Item label="SC" value="SC" />
                            <Picker.Item label="SP" value="SP" />
                            <Picker.Item label="SE" value="SE" />
                            <Picker.Item label="TO" value="TO" />

                        </Picker>
                    </FormRow>
                </View>
                <View style={styles.Form}>

                    <FormRow style={styles.Form}>
                        <TextInput style={styles.TextInput}
                            placeholder="Descrição"
                            value={deputadoForm.description}
                            onChangeText={value => setField('description', value)}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </FormRow>
                </View>
                {this.state.isLoading ?
                    <ActivityIndicator />
                    :
                    <Button
                        title="Salvar"
                        onPress={async () => {
                            this.setState({ isLoading: true })

                            try {
                                await saveDeputado(deputadoForm)
                            } catch (error) {
                                Alert.alert('Erro', error.message);
                            } finally {
                                this.setState({ isLoading: false })
                            }


                            navigation.goBack();
                        }}
                    />
                }
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    Form: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,
    },
    TextInput: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    estado: {
        flexDirection: 'row',
        paddingBottom: 15,
    }

});

const mapStateToProps = (state) => {
    return ({
        deputadoForm: state.deputadoForm
    })
}


const mapDispatchToProps = {
    setField,
    saveDeputado,
    setAllFields,
    resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeputadoScreen);