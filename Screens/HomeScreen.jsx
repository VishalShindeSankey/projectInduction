import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import DishCard from '../components/DishCard'
import HomeBanner from '../components/HomeBanner'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearCart } from '../redux/cartSlice'
import { useFocusEffect } from '@react-navigation/native'
import { fetchDishes } from '../redux/dishSlice'


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.userType);
  const dishes = useSelector((state) => state.dishes);
  const totalItems = useSelector((state) => state.cart.length);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch])

  useFocusEffect(useCallback(() => {
    setModalVisible(false);
  }, []));

  return (
    <ScrollView
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
    >
      <HomeBanner />

      <View style={styles.outerContainer}>
        <View style={styles.headingAndIconContainer}>
          <Text style={styles.heading}>{userType == 'user' ? "Southern Delicacies":"Food Menu"}</Text>
          {userType == 'user' ?
            <View style={styles.cartIconContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={require('../images/shopping-bag-yellow.png')} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'white' }}>{totalItems}</Text>
            </View>:
            <TouchableOpacity style={styles.addDishIconContainer} activeOpacity={0.7} onPress={() => navigation.navigate('DishAction', { action: 'add' })}>
              <Text>+ Add Dish</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

      <View style={styles.dishesContainer}>
        {dishes.map((item) => {
            return (
              <DishCard key={item.id} dish={item} />
            )
          })
        }
      </View>

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
      >
        <TouchableOpacity style={styles.modalOuterContainer} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modalInnerContainer}>

            <View style={styles.btnContainer}>


              <TouchableOpacity onPress={() => {
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
  )
}

const styles = StyleSheet.create({
  outerContainer: {},
  headingAndIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    // marginTop:10,
    backgroundColor: 'green',
    paddingVertical: 8,
    elevation:5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 200,
    marginLeft: 15,
    // marginTop:10
    fontFamily: 'sans-serif',
    letterSpacing: 2,
    color: '#fcb212',
    paddingHorizontal: 10,
    borderRadius: 5,
    // fontStyle:'italic'
    // marginTop:5
  },
  cartIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 12,
    // marginTop: 5
    marginBottom: 3
  },
  dishesContainer: {
    marginTop: 5
  },
  modalOuterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.53)',
    height: '100%'
  },
  modalInnerContainer: {
    // width: '80
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical:15,
    borderTopLeftRadius: 15,
    // borderTopLeftRadius:35,
    borderTopRightRadius: 15,
    elevation: 5
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom:15,
    justifyContent: 'space-around',
    gap: 15,
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 20
  },
  viewCartBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 30,
    // width:300,
    alignItems: 'center'
  },
  clearCartBtn: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'rgba(201, 3, 3, 0.77)',
    borderRadius: 30,
    // width:300,
    alignItems: 'center'

  },
  clearCartBtnText: {
    color: 'white',
    fontSize: 18
    // marginHorizontal:15,

    // elevation:2
  },
  addDishIconContainer: {
    backgroundColor: '#fcb212',
    // position: 'absolute',
    // right: 15,
    // // top: SCREEN_HEIGHT-70,
    // bottom: 15,
    // padding: 10,
    borderRadius: 10,
    paddingHorizontal:10,
    alignItems:'center',
    justifyContent:'center',
    marginRight:5,
    // borderWidth:1,
    // borderColor:'gray'
    elevation: 3

  },
  addDishIcon: {
    height: 30,
    width: 30
  },
})