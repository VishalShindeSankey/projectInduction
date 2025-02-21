import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
const PaymentResult = ({navigation}) => {
    const[isFirstFinished,setIsFirstFinished] = useState(false);

    setTimeout(()=>{
        setIsFirstFinished(true);
    },[6500])

  return (
    <View style={{flex:1,backgroundColor:'white'}}>

      {!isFirstFinished ? 
      <View style={{flex:1}}>
            <LottieView style={{flex:1}} source={require('../animations/Animation - 1739943936304.json')} autoPlay loop={false} />
      </View>:
      <View style={{flex:1,justifyContent:'center'}}>
            <LottieView style={{height:400,width:400}} source={require('../animations/Animation - 1739943605611.json')} autoPlay loop/>
            <Text style={{fontSize:18,alignSelf:'center',fontWeight:500}}>Hang tight, your food is almost there!</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{backgroundColor:'rgb(253, 142, 14), 0)',paddingVertical:10,width:150,borderRadius:15,marginTop:20,alignSelf:'center'}}>
                <Text style={{textAlign:'center',fontSize:16,color:'white',fontWeight:'bold'}}>Go To Home</Text>
            </TouchableOpacity>
      </View>
        }
        
    </View>
  )
}

export default PaymentResult

const styles = StyleSheet.create({})