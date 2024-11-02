import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Quantity from '@/components/Quantity'

const details = () => {
    const data = useLocalSearchParams()
  return (   
    <View style={styles.contaier}>
      <Image style={styles.ss} source={data.img}  /> 
      <Text>{data.name}</Text>
      <Text>{data.price}</Text>
      <Text>{data.quantity}</Text>
      <Quantity />
         \\\\

    <Text>ADD TO</Text>
    
    
    </View>
    
  )
}

export default details

const styles = StyleSheet.create({
  contaier: {
    flex: 1,      
    alignItems: 'center',
  },
  ss:{
    height:450,
    width:450,

    
  }
})