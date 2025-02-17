import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { addUserType } from '../redux/userSlice';
import { useFocusEffect } from '@react-navigation/native';

export default function Login({navigation}) {
    const dispatch = useDispatch();
    const[user,setUser] = React.useState({
        email:'',
        password:''
    });

    useFocusEffect(useCallback(()=>{
        return ()=>{
          setUser({email:'',password:''})
        }
      },[])
    )

    const handleChange = (key,text)=>{
        setUser({...user,[key]:text})
    }

    const handleLogin = ()=>{
        if(user.email.length > 0 && user.password.length > 0){
            if(user.email.toLowerCase() == "user@gmail.com" && user.password == "12345"){
                dispatch(addUserType("user"));
                navigation.navigate('HomeScreen');
            }
            else if(user.email.toLowerCase() == "admin@gmail.com" && user.password == "12345"){
                dispatch(addUserType("admin"));
                navigation.navigate('HomeScreen');
            }
        }else{
            Alert.alert("Please fill all fields");
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
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color:'black'
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
