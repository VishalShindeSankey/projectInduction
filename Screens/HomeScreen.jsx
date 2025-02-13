import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useCallback } from 'react'
// import BottomSheet from './BottomSheet'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'

// import { dishes } from '../restauarantData/dishes'
import DishCard from '../components/DishCard'
import HomeBanner from '../components/HomeBanner'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearCart } from '../redux/cartSlice'
import { useFocusEffect } from '@react-navigation/native'
import { fetchDishes } from '../redux/dishSlice'

export default function HomeScreen({ navigation }) {
  const userType = useSelector((state)=>state.user.userType);
  const dispatch = useDispatch();
  
  const dishes = useSelector((state)=>state.dishes);
  console.log("alldishes from homescreen:",dishes);
  
  // const dishes = mydata;
  
  const totalItems = useSelector((state) => state.cart.length);
  const [modalVisible, setModalVisible] = React.useState(false);
  
  React.useEffect(()=>{
    dispatch(fetchDishes());
  },[dispatch])
  

  useFocusEffect(useCallback(()=>{
    setModalVisible(false);
  },[]));

  return (
    // <GestureHandlerRootView>
    <ScrollView>
      <View style={styles.outerContainer}>
        <HomeBanner />

        {userType == 'user' && 
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require('../images/shopping-bag-green.png')} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: 'green' }}>{totalItems}</Text>
        </View>
        }

        <View style={styles.dishesContainer}>
          {
            dishes.map((item) => {
              return (
                <DishCard key={item.id} dish={item} />
              )
            })
          }
        </View>
      </View>
      
      {userType == 'admin' && 
        <TouchableOpacity style={styles.addDishIconContainer} onPress={()=>navigation.navigate('DishAction',{action:'add'})}>
          <Image source={require('../images/add.png')} style={styles.addDishIcon}/>
        </TouchableOpacity>
      }

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
      > 
        <TouchableOpacity style={styles.modalOuterContainer} onPress={()=>setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modalInnerContainer}>
  
            <View style={styles.btnContainer}>


              <TouchableOpacity onPress={()=>{
                dispatch(clearCart());
                setModalVisible(false);  
              }} style={styles.clearCartBtn}>
                <View ><Text style={styles.clearCartBtnText}>Clear Cart</Text></View>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.viewCartBtn}>
                <Text style={styles.clearCartBtnText}>View Cart </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      
    </ScrollView>
    // </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flex: 1,
  },
  cartIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 5
  },
  dishesContainer: {
    marginTop: 15
  },
  modalOuterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    height: '100%'
  },
  modalInnerContainer: {
    // width: '80
    width:'100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius:35,
    // borderTopLeftRadius:35,
    borderTopRightRadius:35,
    elevation:5
  },
  btnContainer:{
    flexDirection:'row',
    alignItems:'center',
    // marginBottom:15,
    justifyContent:'space-around',
    gap:15,
    paddingHorizontal:10,
    flex:1,
    paddingVertical:20
  },
  viewCartBtn: {
    backgroundColor:'green',
    paddingHorizontal:30,
    paddingVertical:8,
    borderRadius:30,
    // width:300,
    alignItems:'center'
  },
  clearCartBtn:{
    paddingHorizontal:30,
    paddingVertical:8,
    backgroundColor:'rgba(201, 3, 3, 0.77)',
    borderRadius:30,
    // width:300,
    alignItems:'center'

  },
  clearCartBtnText: {
    color:'white',
    fontSize:18
    // marginHorizontal:15,

    // elevation:2
  },
  addDishIconContainer:{
    backgroundColor:'white',
    position:'absolute',
    right:15,
    bottom:15,
    padding:10,
    borderRadius:'50%',
    // borderWidth:1,
    // borderColor:'gray'
    elevation:3

  },
  addDishIcon:{
    height:30,
    width:30
  }
})