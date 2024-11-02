import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const _layout = () => {
  const [state, setState] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.stateContainer}>
        <Pressable onPress={() => {
          if (state > 0) {
            setState(state - 1)
          }
        }}>
          <Text style={styles.text}>-</Text>
        </Pressable>
        <Text style={styles.state}>{state}</Text>
        <Pressable onPress={() => {
          setState(state + 1)
        }}>
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}  

export default _layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 90
  },
  state: {
    fontSize: 90
  }
})