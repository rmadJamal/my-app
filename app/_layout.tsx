import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AppProvider from '@/store/AppProvider'

const _layout = () => {
  return (
  <AppProvider>
    <Stack>
      <Stack.Screen name="index"  options={{title: "RMAD COFE"}} />
      <Stack.Screen name='home' options={{title: "RMAD COFE"}}/>
      <Stack.Screen name=  'r'/>
      <Stack.Screen name='cart'/>
    </Stack>
    </AppProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})