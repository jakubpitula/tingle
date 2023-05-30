import {StyleSheet, Text, View, TextInput, Image, Animated, Easing, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';
import HomeScreenButton from '../components/homeScreenButton';
import LinearGradient from 'react-native-linear-gradient';


export default function AppHomeScreen() {



const images = [
    require('../assets/person1.jpg'),
    require('../assets/person2.jpg'),
    require('../assets/person3.jpg'),
    require('../assets/person4.jpg'),
    require('../assets/person5.jpg'),
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const opacityValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    const fadeIn = () => {
        Animated.parallel([
            Animated.timing(opacityValue, {
              toValue: 0.3,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1.05,
              duration: 5000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
        ]).start(() => {
        setTimeout(fadeOut, 4000); // Transition delay between images (2 seconds)
      });
    };

    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1.04,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(({ finished }) => {
        if (finished) {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      });
    };

    fadeIn();

    return () => {
      opacityValue.stopAnimation();
      scaleValue.stopAnimation();
    };
  }, [currentImageIndex]);

  const currentImage = images[currentImageIndex];

 
  const windowDimensions = Dimensions.get('window');
  const imageStyles = [
    {
      opacity: opacityValue,
      transform: [{ scale: scaleValue }],
      width: windowDimensions.width,
      height: windowDimensions.height,
      position: "absolute"
    },
  ];


  return( 

    <View style={styles.container}>
    <Animated.Image
          source={currentImage}
          style={imageStyles}
          resizeMode="cover"
        />
        <View style={{alignItems: "center", position: "absolute", justifyContent: "center"}}>
        <View style={{paddingRight: 100}}>
            <Text style={styles.title}>Dating, better then ever before </Text>
</View>
          

       
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity >
        <LinearGradient style={styles.button} colors={['#fe8196', '#fc0e78']}>
             <Text style={styles.buttontext}>Sign up</Text>
        </LinearGradient>
           
        </TouchableOpacity>
        </View>
</View>
  )

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#1b1b1b' ,
      shadowOpacity: 100,
      alignItems:'center',
        justifyContent:'center',
      
     
    },
  
    topContainer: {
      height: 270,
      width: 1000,
      right: 50,
      
      
      //transform: [{skewY: '-10deg'}],
     
  
    },
  
    loaderContainer: {
      width: '100%',
      height: 1000,
      flex: 1,
      justifycontent: 'center',
      alignItems: 'center',
      backgroundColor: '#1b1b1b',
  
  },
  
    TextInput: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
      color: 'white',
      flex: 1,
      padding: 5,
    },
  
    inputView: {
      borderBottomWidth: 2,
  
      marginHorizontal: 30,
      marginLeft: 30,
      marginRight:35,
      borderBottomColor: '#C73866',
      flexDirection: 'row'
    },
  
    title: {
      fontSize: 50,
      color: "white",
      letterSpacing: 1,
      
      paddingLeft: 20,
      
      fontFamily: "Archivo-VariableFont_wdth,wght",
    },
  
    smallText: {
      color: '#6d6d6d',
      fontSize: 14,
      letterSpacing: 0,
      fontFamily: 'Gruppo'
    },
  
    textFailed: {
      alignSelf: 'center',
      color: 'red',
      bottom: 33,
      right: 70,
    },
    button:{
        padding:13,
        margin: 10,
        width: 340,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent:"center",
        
    },

    buttontext:{
        color: '#EEEEEE',
        fontSize: 20,
        fontFamily: 'Roboto'
        
        
    }
  });
  