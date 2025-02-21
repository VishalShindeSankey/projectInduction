import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { getAuth } from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

export default function Register({ navigation }) {
    const auth = getAuth();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (key, text) => {
        setUser({ ...user, [key]: text })
    }

    //register logic
    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth,user.email, user.password);
            Alert.alert("Account created successfully!");
            navigation.replace('Login');
        } catch (err) {
            if (err.code == 'auth/email-already-in-use') {
                Alert.alert('That email address is already in use!');
            }
            if (err.code == 'auth/invalid-email') {
                Alert.alert('That email address is invalid!');
            }
            if(err.code == 'auth/weak-password'){
                Alert.alert('Password length should be more than 6');
            }
            console.log(err.code);
        }
    }

    const handleRegister = async () => {
        if (user.email.length > 0 && user.password.length > 0) {
            await registerUser();
        } else {
            Alert.alert("Please fill all fields");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text>Already have an account ? login here</Text>
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
        color: 'black'
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
