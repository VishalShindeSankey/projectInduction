import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUserType } from '../redux/userSlice';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithCredential } from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '963938191278-i4nppq73tfnvutpnn54tr5ghk56d4sie.apps.googleusercontent.com',
});


export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const auth = getAuth();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (key, text) => {
    setUser({ ...user, [key]: text })
  }


  const handleLogin = async () => {
    if (user.email.length > 0 && user.password.length > 0) {
      try {
        await signInWithEmailAndPassword(auth,user.email, user.password);

        if (user.email.toLowerCase() == 'admin@gmail.com' ? dispatch(addUserType('admin')) : dispatch(addUserType('user')));
        setUser({ email: '', password: '' });
        navigation.navigate('HomeScreen');
      } catch (err) {
        console.log(err);
        Alert.alert(err.code);

      }
    } else {
      Alert.alert("Please fill all fields");
    }
  }


  const handleGoogleLogin = async() => {
    try{

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const signInResult = await GoogleSignin.signIn();

      data = signInResult.data;

      const googleCredential = GoogleAuthProvider.credential(data.idToken);
      console.log(googleCredential);

      await signInWithCredential(auth,googleCredential);

      navigation.navigate('HomeScreen');
    }catch(err){
      console.log(err);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          placeholderTextColor='gray'
          value={user.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='gray'
          value={user.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button,{marginTop:10}]} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Register')} style={{alignSelf:'center',marginVertical:5}}>
          <Text>Don't have an account ? Create here</Text>
        </TouchableOpacity>

        <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:25,marginBottom:15}}>
          <View style={{height:1,flex:1,borderTopWidth:1,borderTopColor:'lightgray'}}></View>
          <Text style={{textAlign:'center',flex:1,color:'gray'}}>or sign-in with</Text>
          <View style={{height:1,flex:1,borderTopWidth:1,borderTopColor:'lightgray'}}></View>
        </View>
        
        <View style={{flexDirection:'row',gap:20}}>
          <TouchableOpacity style={[styles.button,{flex:1,marginTop:10,backgroundColor:'white',borderWidth:1,borderColor:'lightgray'}]} onPress={() => handleGoogleLogin()}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
              <Image source={require('../images/google.png')} style={{height:20,width:20}}/>
              <Text style={{fontSize:18}}>Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button,{flex:1,marginTop:10,backgroundColor:'white',borderWidth:1,borderColor:'lightgray'}]} onPress={() => handleGoogleLogin()}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
              <Image source={require('../images/github.png')} style={{height:20,width:20}}/>
              <Text style={{fontSize:18}}>Github</Text>
            </View>
          </TouchableOpacity>
        
        </View> 


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#333',
    fontWeight:500,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: 'black'
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    height:45
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
