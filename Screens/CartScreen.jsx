import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '../redux/cartSlice';

export default function CartScreen({navigation}) {
  const dishes = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = dishes.reduce((a, b) => a + b.price * b.quantity, 0);

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
            <TouchableOpacity onPress={()=>navigation.pop()} style={styles.orderBtn} activeOpacity={0.8} >
              <Text style={styles.orderBtnText}>Explore More</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderBtn} activeOpacity={0.8}>
              <Text style={styles.orderBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>
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
    flex:1
  },
  tableContainer: {
    backgroundColor:'white',
    margin: 25,
    borderRadius: 15,
    elevation:5
  },
  headRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  headData: {
    flex: 0.2,
    textAlign: 'center',
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
  bottomBtnContainer:{
    flexDirection:'row',
    alignSelf:'center',
    gap:20
    // width:'100%'
  },
  orderBtn: {
    backgroundColor: 'green',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 7,
    paddingHorizontal: 30,
    elevation: 5

  },
  orderBtnText: {
    color: 'white',
    textAlign: 'center'
  }
})