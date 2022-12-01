import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const settingsButton = props => {
    const content = (
        
        <View style={[styles.button, {backgroundColor: '#333333'}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({

    button:{
        padding:13,
        margin: 10,
        width: 170,
        borderRadius: 10,
        alignItems: 'center',
    },
    text:{
        color: 'white',
        fontSize: 15,
        
        
    }
})

export default settingsButton;