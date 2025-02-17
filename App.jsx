import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Authenticate from './Screens/Authenticate'
import PinAuthentication from './Screens/PinAuthentication'
import HomeScreen from './Screens/HomeScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CartScreen from './Screens/CartScreen'

import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/cartStore'
import DishAction from './Screens/DishAction'
import Login from './Screens/Login'
import AnimationDemo from './Screens/AnimationDemo'
import TransitionDemo from './Screens/TransitionDemo'
import VerticalScroll from './Screens/VerticalScroll'


const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='AnimationScreen'>
            <Stack.Screen
              name='Login'
              component={Login}
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
            <Stack.Screen
              name='DishAction'
              component={DishAction}
            />

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
              name='AnimationScreen'
              component={AnimationDemo}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='TransitionDemo'
              component={TransitionDemo}
            />
            <Stack.Screen
              name='VerticalScroll'
              component={VerticalScroll}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App