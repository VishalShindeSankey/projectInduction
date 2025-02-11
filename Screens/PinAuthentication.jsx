import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function PinAuthentication({navigation}) {
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Pin Authentication</Text>
        <TouchableOpacity
            onPress={()=>navigation.navigate('HomeScreen')}
        >
            <View style={styles.innerContainer}><Text>Go to HomeScreen</Text></View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    outerContainer:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    innerContainer:{
        width:'50%',
        alignSelf:'center',
        alignItems:'center',
        borderWidth:1,
        padding:10,
        marginVertical:15
    }
})