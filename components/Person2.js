import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HighOrderFunction from './HOC'

const Person2 = ({count,increaseCount}) => {
  return (
    <View>
      <Text>Person2 count is {count}</Text>
      <TouchableOpacity onPress={()=>increaseCount()}><Text>increase count</Text></TouchableOpacity>
    </View>
  )
}

export default HighOrderFunction(Person2);