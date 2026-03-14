import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppContext from './AppContext'

const AppProvider = (props) => {
  const [cart, setCart] = useState([])
  const [user, setuser] = useState()
  return (
    <AppContext.Provider value={{
      user,
      setuser,
      cart,
      setCart
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider

