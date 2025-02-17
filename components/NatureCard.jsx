import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

const NatureCard = (props) => {
  const currIndexValue = useSharedValue(0);

  useEffect(()=>{
    currIndexValue.value = props.currIndex;
    console.log(currIndexValue.value);
  },[props.currIndex]);

  const animatedStyle = useAnimatedStyle(()=>{
    return{
      transform:[{scale:currIndexValue.value == props.index-1 ? withSpring(1.25):withSpring(1)}],
      opacity:currIndexValue.value == props.index-1 ? 1: 0.5
    }
  })
  
  return (
    <Animated.View 
      // style={[animatedStyle]}
    >
      
    <Image 
        source={{uri:props.card.imgUrl}} 
        style={[{height:200,width:300}]}
      />
    </Animated.View>
  )
}

export default NatureCard

const styles = StyleSheet.create({})