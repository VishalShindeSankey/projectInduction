import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getAuth, signOut } from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function HomeBanner() {
  const user = useSelector((state) => state.user.userType)
  const auth = getAuth();
  const navigation = useNavigation();

  const logoutUser = async () => {
    try{
      const currUser = auth.currentUser;
      if (currUser) {
        const isGoogleUser = currUser.providerData.some((provider) => provider.providerId === 'google.com');

        if (isGoogleUser) {
            await GoogleSignin.revokeAccess(); 
            await GoogleSignin.signOut(); 
            console.log('Logged out from Google account');
        }

      await signOut(auth);
      navigation.popToTop();
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../images/banner.jpg')}
        style={styles.bannerImg}
        resizeMode='cover'
      />

      <View style={styles.userProfile}>
        <TouchableOpacity onPress={() => logoutUser()}>
          <Text style={{ fontSize: 22, fontWeight: 500, textAlign: 'center', color: 'green' }}>{user == 'user' ? "U" : "A"}</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: 300,
    overflow: 'hidden',

  },
  bannerImg: {
    height: 300,
    width: '100%',
    resizeMode: 'cover'
  },
  userProfile: {
    // backgroundColor:'#fcb212',
    backgroundColor: 'white',

    // padding:10,
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'gray'

  },
})