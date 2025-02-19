import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HighOrderFunction from './HOC'

const Person1 = ({count,increaseCount}) => {
  return (
    <View>
      <Text>Person1 count is {count}</Text>
      <TouchableOpacity onPress={()=>increaseCount()}><Text>click increase count</Text></TouchableOpacity>
    </View>
  )
}

export default HighOrderFunction(Person1);