import React from 'react';
import { ScrollView, Text, StyleSheet, Image, Button, View } from 'react-native';
import Line from '../components/Line'
import LongText from '../components/LongText';

import { connect } from 'react-redux';
import { deleteDeputado } from '../actions';

class DeputadoDetailScreen extends React.Component {
    render() {
        const { deputado } = this.props.navigation.state.params;
        return (
            <ScrollView>
                <View style={style.container}>
                    <Image
                        source={{ uri: deputado.img }}
                        style={style.image}
                    />
                    <View style={style.line}>
                        <Line label="Deputado" content={deputado.name} style={style.line} />
                        <Line label="Partido" content={deputado.partido} style={style.line} />
                        <Line label="Estado" content={deputado.estado} style={style.line} />
                    </View>
                </View>

                <LongText label="Descricão" content={deputado.description} style={style.line} />

                


                <View style={StyleSheet.button}>
                    <Button
                        title="Editar"
                        onPress={() => {
                            this.props.navigation.replace('NewDeputadoScreen', { deputadoToEdit: deputado })
                        }}
                    />
                </View>
                <View style={StyleSheet.button}>
                    <Button
                        title="Excluir"
                        color="#FF0004"
                        onPress={async () => {
                            const hasDeleted = await this.props.deleteDeputado(deputado);

                            if (hasDeleted) {
                                this.props.navigation.goBack();
                            }

                            console.log('apagar');
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        //aspectRatio: 2,
        width: 150,
        height: 154,
        borderColor: 'black',
        borderWidth: 5,
    },
    button: {
        margin: 10,
    },
    line: {
        width: 300,
    }
})

export default connect(null, { deleteDeputado })(DeputadoDetailScreen);
