import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

export default function HomeBanner() {
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../images/banner.jpg')}
        style={styles.bannerImg}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    outerContainer:{
        width:'100%',
        height:300
    },
    bannerImg:{
        height:300,
        resizeMode:'cover'
    }
})