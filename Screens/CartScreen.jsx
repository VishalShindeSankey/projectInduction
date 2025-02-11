import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CartScreen() {
    const dishes = useSelector((state)=>state.cart);
    console.log(dishes);
  return (
    <View>
      <Text>CartScreen {dishes.length}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})