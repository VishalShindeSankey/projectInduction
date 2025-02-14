import React from 'react'
import { StyleSheet, Text, View ,Image, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'

const{width:SCREEN_WIDTH} = Dimensions.get("window");

export default function HomeBanner() {
  const user = useSelector((state)=>state.user.userType)
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../images/banner.jpg')}
        style={styles.bannerImg}
        resizeMode='cover'
      />
      <View style={styles.userProfile}><Text style={{fontSize:22,fontWeight:500,textAlign:'center',color:'green'}}>{user == 'user' ? "U":"A"}</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
    outerContainer:{
        width:SCREEN_WIDTH,
        height:300,
        overflow:'hidden',
        
    },
    bannerImg:{
        height:300,
        width:'100%',
        resizeMode:'cover'
    },
    userProfile:{
      // backgroundColor:'#fcb212',
      backgroundColor:'white',

      // padding:10,
      position:'absolute',
      top:10,
      left:10,
      width:40,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20,
      elevation:5,
      borderWidth:1,
      borderColor:'gray'
      
    },
})