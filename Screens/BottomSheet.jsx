import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useAnimatedStyle, useSharedValue,withSpring } from 'react-native-reanimated'

const {height:SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT+50;

export default function BottomSheet() {
    const translateY = useSharedValue(0);
    const prevTranslateY = useSharedValue(0);

    const gesture = Gesture.Pan().onStart(()=>{
        prevTranslateY.value = translateY.value; 
    }).onUpdate((event)=>{
        translateY.value = event.translationY+prevTranslateY.value;
        translateY.value = Math.min(translateY.value,MAX_TRANSLATE_Y);
    });


    const animatedBottomSheetStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateY:translateY.value}]
        }
    })

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer,animatedBottomSheetStyle]}>
            <Text>BottomSheet</Text>
        </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
    bottomSheetContainer:{
        height:SCREEN_HEIGHT,
        width:'100%',
        position:'absolute',
        top:SCREEN_HEIGHT,
        backgroundColor:'blue',
        borderRadius:25
    }
})