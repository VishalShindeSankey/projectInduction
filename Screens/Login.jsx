import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addUserType } from '../redux/userSlice';

export default function Login({navigation}) {
    const[user,setUser] = React.useState({
        email:'',
        password:''
    });

    const dispatch = useDispatch();

    const handleChange = (key,text)=>{
        setUser({
            ...user,
            [key]:text
        })
    }

    const handleLogin = ()=>{
        if(user.email.length > 0 && user.password.length > 0){
            if(user.email == "user@gmail.com" && user.password == "12345"){
                dispatch(addUserType("user"));
                navigation.navigate('HomeScreen');
            }
            else if(user.email == "admin@gmail.com" && user.password == "12345"){
                dispatch(addUserType("admin"));
                navigation.navigate('HomeScreen');
            }
        }else{
            Alert.alert("Fill all fields");
        }
    }
  return (
    <View>
      <Text>Login</Text>
      <View>
        <TextInput
            placeholder='Email'
            placeholderTextColor='black'
            value={user.email}
            onChangeText={(text)=>handleChange('email',text)}
        />
        <TextInput
            placeholder='Password'
            placeholderTextColor='black'
            value={user.password}
            onChangeText={(text)=>handleChange('password',text)}
            secureTextEntry
        />

        <TouchableOpacity onPress={()=>handleLogin()}>
            <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})