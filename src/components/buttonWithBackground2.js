import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const buttonWithBackground1 = props => {
    const content = (
        
        <LinearGradient style={styles.button} colors={['#C73866', '#FE676E']}>
            <Text style={styles.text}>{props.text}</Text>
        </LinearGradient>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({

    button:{
        padding: 10,
        margin: 0,
        width: 180,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent:"center"
    },
    text:{
        color: 'white',
        fontSize: 20,
        
        
    }
})

export default buttonWithBackground1;