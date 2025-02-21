import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Login'
import HomeScreen from './HomeScreen'
import CartScreen from './CartScreen'
import PaymentResult from './PaymentResult'
import DishAction from './DishAction'
import Register from './Register'

import AnimationDemo from './AnimationDemo'
import TransitionDemo from './TransitionDemo'
import VerticalScroll from './VerticalScroll'
import Authenticate from './Authenticate'
import PinAuthentication from './PinAuthentication'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    const userType = useSelector((state)=>state.user.userType);
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen
                name='Login'
                component={Login}
                options={{
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Register'
                component={Register}
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

              {userType == 'admin' &&
                  <Stack.Screen
                  name='DishAction'
                  component={DishAction}
                  />
                }

              <Stack.Screen
                name='Payment Result'
                component={PaymentResult}
                options={{
                  headerShown: false
                }}
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
  )
}

export default AuthNavigation