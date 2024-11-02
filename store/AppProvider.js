import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppContext from './AppContext'

const AppProvider = (props) => {
    const[cart, setCart] = useState([])
  return (
    <AppContext.Provider value={{

        cart,
        setCart
    }}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider

