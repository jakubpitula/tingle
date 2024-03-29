import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const SmallButton = props => {
    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
    button:{
        padding:10,
        marginTop: 5,
        width: 150,
        alignItems: 'center',
        marginBottom: 0,
    },
    text: {
        color: '#C73866',
        fontSize: 13,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        alignItems: 'center'
    }



})

export default SmallButton;