import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';

const AddCard = ({ isLeft, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style={
            styles.container
        }>
        <View StyleSheet={styles.container}>
            <Image
                source={{ uri: "https://image.flaticon.com/icons/png/512/69/69301.png" }}
                aspectRatio={1}
                resizeMode="cover"
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        padding: 5,
    },
    card: {
        flex: 1,
        borderWidth: 1,

    },


});

export default AddCard;
