import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Rmad77 = (props) => {
  return (
    <View>
    <Text style={styles.name}>{props.name}</Text>
    </View>
  )
}

export default Rmad77

const styles = StyleSheet.create({
 name:{
    color:'yellow'
 }
})