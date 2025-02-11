import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Authenticate from './Screens/Authenticate'
import PinAuthentication from './Screens/PinAuthentication'
import HomeScreen from './Screens/HomeScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CartScreen from './Screens/CartScreen'

import { Provider } from 'react-redux'
import { store } from './redux/cartStore'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName='Authenticate'>
            <Stack.Screen
              name='Authenticate'
              component={Authenticate}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='PinAuthentication'
              component={PinAuthentication}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='CartScreen'
              component={CartScreen}

            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App