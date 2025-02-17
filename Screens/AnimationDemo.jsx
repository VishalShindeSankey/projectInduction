import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AnimationDemo = ({navigation}) => {
  return (
    <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('TransitionDemo')}>
            <Text>Transition Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('VerticalScroll')}>
            <Text>VerticalScroll Demo</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AnimationDemo

const styles = StyleSheet.create({})