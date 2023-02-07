import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const invalidButton = props => {
    const content = (
        
        <View style={[styles.button, {backgroundColor: 'grey'}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({

    button:{
        padding:13,
        margin: 10,
        width: 180,
        borderRadius: 25,
        alignItems: 'center',
        
    },
    text:{
        color: 'white',
        fontSize: 20,
        
        
    }
})

export default invalidButton;