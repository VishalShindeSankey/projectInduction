import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { cardsData } from '../restauarantData/cards'
import NatureCard from '../components/NatureCard'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const TransitionDemo = () => {
  const cards = cardsData;
  const [toggle, setToggle] = useState(false);
  
  const alpha = Math.PI / 6;
  const CARD_WIDTH = 300;

  return (
    <View style={{ flex: 1 }}>
      {cards.length > 0 && (
        cards.map((card, index) => {

          const rotateValue = useSharedValue(0);
          useEffect(()=>{
            rotateValue.value = withTiming(toggle ? (index - 1) * alpha:0,400);
          },[toggle])

          const animatedStyle = useAnimatedStyle(()=>{
            return {
              transform: [{translateX:-CARD_WIDTH/2},{ rotate: `${rotateValue.value}rad`}, {translateX:CARD_WIDTH/2}]
            }
          });
          return (
            <Animated.View
              key={index}
              style={[{
                width:CARD_WIDTH,
                position:'absolute',
                top:200,
                left:50,
                height:200,
              },animatedStyle]}
            >
              <NatureCard  card={card} />
            </Animated.View>
          )
        }))
      }

      <TouchableOpacity onPress={() => setToggle(!toggle)} style={{ backgroundColor: 'rgb(0, 153, 255)', position: 'absolute', bottom: 0, width: '100%', paddingVertical: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>{toggle ? "reset" : "start"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TransitionDemo