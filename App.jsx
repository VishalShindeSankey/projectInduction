import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './redux/cartStore'
import { StripeProvider } from '@stripe/stripe-react-native'
import AuthNavigation from './Screens/AuthNavigation'


const App = () => {
  
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <StripeProvider publishableKey='pk_test_51Ml8c9SCcmZcu4zPa3e9e8G0CVjJHKCrQmFGEkQelBApreKf3hKyPDvxr9vsLWNnUvSfphvccloKmymRwbT7hY4l00UvPo3d43'>
          <AuthNavigation/>
        </StripeProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App