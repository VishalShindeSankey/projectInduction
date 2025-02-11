import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TouchID from 'react-native-touch-id'

export default function Authenticate({navigation}) {
    const[isBiometricsAvailable,setIsBioMetricsAvailable] = React.useState(false);

    // const optionalConfigObject = {
    //     title: 'Authentication Required', 
    //     imageColor: '#e00606', 
    //     imageErrorColor: '#ff0000', 
    //     sensorDescription: 'Touch sensor', 
    //     sensorErrorDescription: 'Failed', 
    //     cancelText: 'Cancel', 
    //     fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    //     unifiedErrors: false, // use unified error messages (default false)
    //     passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    //   };

    //check if bio metric is available
    const checkBiometricsAvailability = async()=>{
        try{
            await TouchID.isSupported();
            setIsBioMetricsAvailable(true);
            handleBiometrics();

        }catch(err){
            setIsBioMetricsAvailable(false);
            console.log("no biometrics avalable");
            navigation.navigate('PinAuthentication');
        }
    }

    //authenticate biometrics
    const handleBiometrics = async()=>{
        try{
            const sucess = await TouchID.authenticate();
            console.log(sucess);
            if(sucess){
                navigation.navigate('HomeScreen');
                console.log("you are authenticated");
            }else{
                console.log('please try again');
                Alert.alert("Please try again!");
            }
        }catch(err){
            console.log(err);
        }
    }

    React.useEffect(()=>{
       checkBiometricsAvailability();
    },[])

    console.log(isBiometricsAvailable);

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('PinAuthentication')}
      >
        <View style={styles.innerContainer}><Text>Authenticate by pin</Text></View>
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
    innerContainer:{
        borderWidth:1,
        padding:10,
    }
})