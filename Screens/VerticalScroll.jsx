import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { doubleCardsData } from '../restauarantData/cards'
import NatureCard from '../components/NatureCard'

const VerticalScroll = () => {
    const cards = doubleCardsData;
    const [currIndex,setCurrIndex]  = useState(0);
    console.log(cards);

    return (
        <View style={{flex:1 ,alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <FlatList
                    onScroll={(e)=>{
                        const Y = e.nativeEvent.contentOffset.y;
                        setCurrIndex((Y/260).toFixed(0));
                        console.log(currIndex);
                    }}

                    data={cards}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{margin:30}}>
                                <NatureCard card={item} index={index} currIndex = {currIndex}/>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    
                >
                </FlatList>
            </View>
        </View>
    )
}

export default VerticalScroll