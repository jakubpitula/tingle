import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const buttonWithBackground3 = props => {
    const content = (
        
        <LinearGradient style={styles.button} colors={['#fe8196', '#fc0e78']}>
            <Text style={styles.text}>{props.text}</Text>
        </LinearGradient>
    )
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({

    button:{
        paddingLeft: 10,
        margin: 0,
        width: 180,
        borderRadius: 180,
        justifyContent:"center",
        alignSelf: 'flex-end',
    },
    text:{
        color: 'white',
        fontSize: 20,
        
        
    }
})

export default buttonWithBackground3;