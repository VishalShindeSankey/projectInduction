import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Alert, Image} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addDish, updateDishById } from '../redux/dishSlice';
import { useNavigation } from '@react-navigation/native';
export default function DishAction({route}) {
    // console.log(route.params.action);
    const[data,setData] = React.useState({
        name:"",
        imgUrl:"",
        price:null,
        rating:null
    });

    const actionType = route.params.action;
    // const dishData = route.params.dish ? route.params.dish:{};
    React.useEffect(()=>{
        if(actionType == 'update'){
            const {name,imgUrl,price,rating} = route.params.dish;
            setData({
                name:name,
                imgUrl:imgUrl,
                price:String(price),
                rating:String(rating)
            })
        }
    },[])

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleChange = (name,value)=>{
        setData(
            {
                ...data,
                [name]: value
            }
        )
    }

    const handleAddClick = ()=>{
        if(data.name.trim().length > 0 && data.imgUrl.trim().length > 0 && data.price && data.rating) {
            dispatch(addDish(data));
            navigation.pop();
            Alert.alert("Dish added to menu");
        }else{
            Alert.alert("Please fill all fields!");
        }

    }

    const handleCancelClick = ()=>{
        navigation.pop();
    }

    const handleSaveClick = ()=>{
        if(data.name.trim().length > 0 && data.imgUrl.trim().length > 0 && data.price.trim().length && data.rating.trim().length) {
            dispatch(updateDishById({...data,id:String(route.params.dish.id)}));
            Alert.alert("Dish data updated!");
            navigation.pop();
        }else{
            Alert.alert("Please fill all fields!");
        }
    }

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>{actionType == 'add' ? "Add New Dish":"Edit Dish Data"}</Text>
      <View style={styles.innerContainer}>
        {data.imgUrl.length > 0 && <Image
            source={{uri:`${data.imgUrl}`}}
            height={220}
            width={200}
            style={{borderRadius:10,alignSelf:'center'}}
        />}
        <View style={styles.formRow}><Text style={styles.formRowText}>Name :</Text><TextInput
            // placeholder='Name'
            // placeholderTextColor='gray'
            style={styles.textInputBox}
            value={data.name}
            onChangeText={(text)=>handleChange('name',text)}
        /></View>

         <View style={styles.formRow}><Text style={styles.formRowText}>Image Url :</Text><TextInput
            // placeholder='Image Url'
            // placeholderTextColor='gray'
            style={styles.textInputBox}
            value={data.imgUrl}
            onChangeText={(text)=>handleChange('imgUrl',text)}
        /></View>
         <View style={styles.formRow}><Text style={styles.formRowText}>Price :</Text><TextInput
            // placeholder='Price'
            // placeholderTextColor='gray'
            style={styles.textInputBox}
            value={data.price}
            keyboardType='numeric'
            onChangeText={(text)=>handleChange('price',text)}
        /></View>
         <View style={styles.formRow}><Text style={styles.formRowText}>Rating :</Text><TextInput
            // placeholder='Rating'
            // placeholderTextColor='gray'
            style={styles.textInputBox}
            value={data.rating}
            keyboardType='numeric'
            onChangeText={(text)=>handleChange('rating',text)}
        /></View>

        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={()=>handleCancelClick()}>
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            {actionType == 'add' ? 
            <TouchableOpacity style = {styles.addBtn} activeOpacity={0.7} onPress={()=>handleAddClick()}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style = {styles.addBtn} activeOpacity={0.7} onPress={()=>handleSaveClick()}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    outerContainer:{
        alignItems:'center',
        backgroundColor:'white',
        flex:1
    },
    heading:{
        fontSize:22,
        fontWeight:'bold',
        marginTop:15
    },
    innerContainer:{
        backgroundColor:'whitesmoke',
        padding:20,
        marginTop:20,
        borderRadius:15,
        // alignItems:'center'
    },
    textInputBox:{
        width:300,
        borderWidth:1,
        borderColor:'lightgray',
        backgroundColor:'white',
        borderRadius:10,
        paddingLeft:10,
        
    },
    formRow:{
        marginTop:10,
        // flexDirection:'row',
        // alignItems:'center'
    },  
    formRowText:{
        // paddingLeft:10
        fontWeight:500
    },
    btnContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        
    },
    cancelBtn:{
        backgroundColor:'red',
        paddingVertical:5,
        width:100,
        borderRadius:10
    },
    addBtn:{
        backgroundColor:'green',
        paddingVertical:5,
        width:100,
        borderRadius:10
    },
    btnText:{
        textAlign:'center',
        color:'white'
    }
})