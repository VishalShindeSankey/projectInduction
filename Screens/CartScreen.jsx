import { Image, StyleSheet, Text, View, TouchableOpacity, Alert,Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter, clearCart } from '../redux/cartSlice';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useState } from 'react';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.cart);
  const total = dishes.reduce((a, b) => a + b.price * b.quantity, 0);

  const [modalVisible, setModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const DELIVERY_CHARGES = Number(total * 0.15).toFixed(0);

  const createPaymentIntent = async () => {
    const response = await axios.post('https://api.stripe.com/v1/payment_intents',
      new URLSearchParams({
        amount: (total+Number(DELIVERY_CHARGES)) * 100,
        currency: 'INR',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer sk_test_51Ml8c9SCcmZcu4zPQI5I6mrpGNJ5KeDH9IAn4LanyiN6Bt4c8DeSEhNl3zNE6mgCLQshDgZbSpMVbZwIVqsgcpal00IiYqyg42`,
        },
      }
    );
    console.log(response.data);
    return response.data.client_secret;
  }


  const initializePaymentSheet = async () => {
    const client_secret = await createPaymentIntent();
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: client_secret,
      merchantDisplayName: "Merchant Name",
      customerId: 'userId',
      defaultBillingDetails: {
        name: 'Vishal Shinde',
        address: {
          country: 'IN', 
        }
      },       
    });
    if (error) {
      console.log('Error initializing payment sheet', error);
    }
  }

  const displayPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log("Error displaying payment sheet", error);
    } else {
      // Alert.alert("Payment successful");
      dispatch(clearCart());
      navigation.navigate('Payment Result');
    }
  }

  const handleCheckout = async () => {
    setModalVisible(false);
    await initializePaymentSheet();
    await displayPaymentSheet();
  }

  const handlePlaceOrder = ()=>{
    setModalVisible(true);
  }

  return (
    <View style={styles.outerContainer}>
      {dishes.length > 0 ?
        <View>
          <View style={styles.tableContainer}>
            <View style={styles.headRow}>
              <Text style={styles.headData}>Image</Text>
              <Text style={[styles.headData, styles.headName]}>Dish</Text>
              <Text style={[styles.headData, styles.headPrice]}>Price</Text>
              <Text style={[styles.headData, styles.headName]}>Quantity</Text>
              <Text style={[styles.headData, styles.headPrice]}>Total</Text>
            </View>
            {
              dishes.map((item) => {
                return (
                  <View style={styles.row} key={item.id}>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={styles.dishImg}
                    />
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.dishPrice}>{item.price}</Text>

                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(decrementCounter(item.id));
                        }}
                      >
                        <Image source={require('../images/minus.png')} style={styles.counterIcons} />
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => dispatch(incrementCounter(item.id))}
                      >
                        <Image source={require('../images/add.png')} style={styles.counterIcons} />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.totalRowPrice}>{item.quantity * item.price}</Text>
                  </View>
                )
              })
            }
            <View style={styles.bottomRow}>
              <Text style={styles.totalText}>Total Price :</Text>
              <Text style={styles.totalValue}>Rs.{total}</Text>
            </View>
          </View>

          <View style={styles.bottomBtnContainer}>
            <TouchableOpacity onPress={() => navigation.pop()} style={styles.orderBtn} activeOpacity={0.8} >
              <Text style={styles.orderBtnText}>Explore More</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderBtn} activeOpacity={0.8} onPress={() => handlePlaceOrder()}>
              <Text style={styles.orderBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <View><Text style={styles.title}>Order Summary</Text></View>
                <View  style={[styles.modalRow,{borderBottomWidth:1,borderColor:'lightgray'}]}><Text>Total Amount: </Text><Text>₹{total}</Text></View>
                <View  style={[styles.modalRow,,{borderBottomWidth:1,borderColor:'lightgray'}]}><Text>Delivery Charges: </Text><Text>₹{DELIVERY_CHARGES}</Text></View>
                <View style={styles.modalRow}><Text style={{fontWeight:'bold'}}>Amount To Pay: </Text><Text style={{fontWeight:'bold'}}>₹{Number(total)+Number(DELIVERY_CHARGES)}</Text></View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={()=>handleCheckout()} style={[styles.button,styles.continueButton]}>
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setModalVisible(false)} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        :
        <Text style={{ padding: 5, textAlign: 'center' }}>Cart Is Empty</Text>
      }


    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    // borderWidth:1,
    // borderColor:'gray',
    backgroundColor: 'smokewhite',
    flex: 1
  },
  tableContainer: {
    backgroundColor: 'white',
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    elevation: 5
  },
  headRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  headData: {
    flex: 0.2,
    textAlign: 'center',
    // color: '#fcb212'
    color: 'white'
  },
  headName: {
    flex: 0.3,
    textAlign: 'center'
  },
  headPrice: {
    flex: 0.1,
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 7,
    paddingHorizontal: 10
  },
  dishImg: {
    height: 70, width: 70
    , borderRadius: 5,
    // flex:0.15,
  },
  dishName: {
    maxWidth: 90,
    flex: 0.3,
    paddingHorizontal: 5
  },
  dishPrice: {
    // backgroundColor:'yellow',
    // textAlign:'start'
    flex: 0.15,
    textAlign: 'center'
  },
  dishTotalPrice: {
    // backgroundColor:'yellow',
    // textAlign:'start'
    flex: 0.2,
    textAlign: 'center',
    // paddingRight:2
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: 'green',
    // backgroundColor:'green',
    // elevation:2,
    alignSelf: 'center',
    width: 80,
    height: 30,
    // flex:0.1
  },
  qty: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14
  },
  counterIcons: {
    height: 8,
    width: 8,
    marginHorizontal: 5

  },
  totalRowPrice: {
    fontWeight: 'bold',
    flex: 0.15,
    textAlign: 'right'

  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  totalText: {
    fontWeight: 'bold'
  },
  totalValue: {
    fontWeight: 'bold'
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // gap:30
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 10
  },
  orderBtn: {
    backgroundColor: 'green',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 7,
    paddingHorizontal: 40,

    // elevation: 1

  },
  orderBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
  ,

  //modal
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // Add shadow for iOS
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalRow:{
    width:'100%',
    paddingVertical:7,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },  
  continueButton: {
    backgroundColor: 'green', // Green color for continue button
  },
  cancelButton: {
    backgroundColor: 'rgba(201, 3, 3, 0.77)', // Red color for cancel button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})