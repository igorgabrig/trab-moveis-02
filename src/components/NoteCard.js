import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const SerieCard = ({ note, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={styles.container}>
        <View StyleSheet={styles.container}>

            <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{note.title}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 5,
    },
    card: {
        flex: 1,
        borderWidth: 1,

    },
    cardTitleContainer: {
        backgroundColor: 'black',
        opacity: 0.7,
        width: '100%',
        alignItems: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    leftColumn: {
        paddingLeft: 10,
    },
    rightColumn: {
        paddingRight: 10,
    }

});

export default SerieCard;
