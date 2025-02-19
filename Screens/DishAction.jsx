import { StyleSheet, Text, View ,TextInput, TouchableOpacity, Alert, Image} from 'react-native'
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addDish, updateDishById } from '../redux/dishSlice';
import { useNavigation } from '@react-navigation/native';

export default function DishAction({route}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const actionType = route.params.action;
    const[data,setData] = useState({
        name:"",
        imgUrl:"",
        price:null,
        rating:null
    });

    //to prefill the data on update screen
    useEffect(()=>{
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
      <View style={styles.innerContainer}>
        {data.imgUrl.length > 0 && (
          <Image
            source={{ uri: `${data.imgUrl}` }}
            style={styles.image}
          />
        )}

        <View style={styles.formRow}>
          <Text style={styles.formRowText}>Name :</Text>
          <TextInput
            style={styles.textInputBox}
            value={data.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowText}>Image Url :</Text>
          <TextInput
            style={{borderWidth:1,borderColor:'lightgray',borderRadius:10,height:50,backgroundColor:'whitesmoke'}}
            value={data.imgUrl}
            onChangeText={(text) => handleChange('imgUrl', text)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowText}>Price :</Text>
          <TextInput
            style={styles.textInputBox}
            value={data.price}
            keyboardType='numeric'
            onChangeText={(text) => handleChange('price', text)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowText}>Rating :</Text>
          <TextInput
            style={styles.textInputBox}
            value={data.rating}
            keyboardType='numeric'
            onChangeText={(text) => handleChange('rating', text)}
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={() => handleCancelClick()}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          {actionType === 'add' ? (
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => handleAddClick()}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => handleSaveClick()}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    backgroundColor:'white',
    flex: 1,
    // padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    width: '100%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // elevation: 5,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textInputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 12,
    marginTop: 2,
  },
  formRow: {
    marginTop: 15,
  },
  formRowText: {
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  btnContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf:'center',
    width:'100%',
    gap:15
  },
  cancelBtn: {
    backgroundColor: 'rgba(201, 3, 3, 0.77)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    // width:100
    width:"100%",

  },
  addBtn: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:"100%",
    // alignSelf:'center'

  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});