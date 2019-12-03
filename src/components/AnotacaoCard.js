import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const AnotacaoCard = ({ deputado, isLeft, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={styles.container}>
        <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{deputado.name}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        marginTop: 3,
        marginBottom: 7,
        elevation: 1,
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,

    },
    containerCard: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    cardTitleContainer: {
        //backgroundColor: 'black',
        //height: 50,
        bottom: 40,
        //paddingTop: 10,
        //paddingBottom: 10,
        //paddingRight: 5,
        paddingLeft: 8,
        //alignItems: 'center',
    },
    cardTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardPartido: {
        color: 'black',
        fontSize: 15,

    },
    imagem: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },

});

export default AnotacaoCard;
