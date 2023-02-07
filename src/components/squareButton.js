import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const squareButton = props => {
    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
    button:{
        paddingVertical:10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        alignItems: 'left'
    }



})

export default squareButton;