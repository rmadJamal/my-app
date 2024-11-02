import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Whatsapp from "../../components/Whatsapp"
import Coffee from '@/components/Coffee'
import Example from '@/src/screens/Example'
import { router } from 'expo-router'

const index = () => {
  return (
    // <Whatsapp />
    <View style={styles.container}>
      {/* <Example /> */}
      {/* <Text>ljsd</Text>
      <Text>ljsd</Text>
      <Text>ljsd</Text>
      <Text>ljsd</Text> */}
      {/* <Coffee /> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
