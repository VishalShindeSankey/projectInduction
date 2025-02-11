import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
// import BottomSheet from './BottomSheet'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { dishes } from '../restauarantData/dishes'
import DishCard from '../components/DishCard'
import HomeBanner from '../components/HomeBanner'
import { useSelector } from 'react-redux'

export default function HomeScreen({ navigation }) {
  const totalItems = useSelector((state) => state.cart.length);
  return (
    // <GestureHandlerRootView>
    <ScrollView>
      <View style={styles.outerContainer}>
        <HomeBanner />


        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Image source={require('../images/shopping-bag-green.png')} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: 'green' }}>{totalItems}</Text>
        </View>

        <View style={styles.dishesContainer}>
          {
            dishes.map((item) => {
              return (
                <DishCard key={item.id} dish={item} />
              )
            })
          }
        </View>
      </View>
    </ScrollView>
    // </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flex: 1,
  },
  cartIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 5
  },
  dishesContainer: {
    marginTop: 15
  }
})