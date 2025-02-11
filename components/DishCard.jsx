import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { incrementCounter,decrementCounter } from '../redux/cartSlice';
import { addToCart } from '../redux/cartSlice';

export default function DishCard(props) {
    const[isAdded,setIsAdded] = React.useState(false);
    // const[counter,setCounter] = React.useState(0);
    const dish = useSelector((state)=>state.cart).find((item)=>item.id == props.dish.id);
    console.log(dish);
    const counter = dish ? dish.quantity:0;

    const dispatch = useDispatch();

    const addFirstTime = ()=>{
        const currDish = {...props.dish,quantity:1};
        console.log(currDish);
        dispatch(addToCart(currDish));
        setIsAdded(true);
        // setCounter(1);
    }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.imgContainer}>
        <Image
            source={{
                uri:props.dish.imgUrl
            }}
            height={160}
            width={150}
            style={styles.dishImg}
        />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.textData}>
            <Text style={styles.dishName}>{props.dish.name}</Text>
            <View style={styles.dishPriceContainer}><Image source={require('../images/rupee.png')} style={styles.rupeeIcon}/><Text style={styles.dishPrice}>{props.dish.price}</Text></View>
            <View style={styles.dishRatingContainer}><Image source={require('../images/greenstar.png')} style={styles.ratingIcon}/><Text style={styles.dishRating}>{props.dish.rating}</Text><Text>&#40;{(Math.random()*100).toFixed(0)}&#41;</Text></View>
            <Text style={styles.dishDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        </View>
        <View>
            {!isAdded ? 
                <TouchableOpacity style={styles.addBtn} onPress={()=>addFirstTime()}>
                    <Text style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
                :
                <View style={styles.counterContainer}>
                    <TouchableOpacity
                        onPress={()=>{
                            dispatch(decrementCounter(props.dish.id));
                            console.log(counter);
                            if(counter == 1 ) setIsAdded(false);
                        }}
                    >
                        <Image source={require('../images/minus.png')} style={styles.counterIcons}/>
                    </TouchableOpacity>    
                    <Text style={styles.qty}>{counter}</Text>
                    <TouchableOpacity
                        onPress={()=>dispatch(incrementCounter(props.dish.id))}
                    >   
                        <Image source={require('../images/add.png')} style={styles.counterIcons}/>
                    </TouchableOpacity>    
                </View>
            }

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    outerContainer:{
        display:'flex',
        flexDirection:'row',
        marginHorizontal:25,
        // padding:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgray',
        paddingVertical:15,
        gap:10
    },
    dishImg:{
        borderRadius:10
    },
    dataContainer:{
        display:'flex',
        flex:1,
        // backgroundColor:'gray'
        justifyContent:'space-between'
    },
    textData:{
        display:'flex',
        flex:1
    },  
    dishName:{
        fontSize:18,
        fontWeight:'bold'
    },
    rupeeIcon:{
        height:20,
        width:15
    },
    dishPriceContainer:{
        fontWeight:'bold',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    dishPrice:{
        fontSize:18,
        fontWeight:'bold'
    },  
    dishRatingContainer:{
        fontWeight:'bold',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    ratingIcon:{
        height:16,
        width:16
    },
    dishRating:{
        fontSize:14,
        fontWeight:'bold',
        color:'green',
        marginRight:3
    },
    dishDesc:{
        color:'gray',
        marginTop:5
    },
    addBtn:{
        borderWidth: 1,
        borderRadius: 10,
        padding:5,
        borderColor: 'green',
        backgroundColor: 'green',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 3,
        alignSelf: 'center',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText:{
        textAlign:'center',
        color:'whitesmoke',
        fontWeight:'bold',
        letterSpacing:1,
    },
    counterContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        borderRadius:10,
        padding:5,
        borderColor:'green',
        // backgroundColor:'green',
        // elevation:2,
        alignSelf:'center',
        width:100
    },
    qty:{
        color:'green',
        fontWeight:'bold',
        fontSize:16
    },
    counterIcons:{
        height:12,
        width:13,
        marginHorizontal:5

    }


})