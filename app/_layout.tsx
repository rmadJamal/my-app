import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{title: "RMAD COFE"}} />
      <Stack.Screen name='home' options={{title: "RMAD COFE"}}/>
      <Stack.Screen name=  'r'/>
      <Stack.Screen name='cart'/>
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})