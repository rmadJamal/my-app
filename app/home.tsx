import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '@/assets/images/Images'
import { blue, red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import data from '@/assets/data'
import { useNavigation } from 'expo-router'

const home = () => {
  const nav = useNavigation()
  const renderData = () => {
    const render = data.map(val => {
      return (
        <View style={styles.valConatiner}>
          <TouchableOpacity onPress={()=>{
            nav.navigate("details", val )
          }} >
            <Image source={val.img} style={styles.valImg} />
          </TouchableOpacity>
        </View>
      )
    })
    return render
  }
  return (
    <View style={styles.container}>
      {/* <Text>home</Text>
      <TouchableOpacity>
        <Image style={styles.doretos} source={Images.doretos} />

      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={styles.drenk} source={Images.drenk} />

      </TouchableOpacity>

      <TouchableOpacity>

        <Image style={styles.siiiii} source={Images.siiiii} />

      </TouchableOpacity>

      <TouchableOpacity>

        <Image style={styles.xl} source={Images.xl} />

      </TouchableOpacity>

      <TouchableOpacity>
      <Image style={styles.trobet} source={Images.trobet} />

      </TouchableOpacity>

      <TouchableOpacity>
        
      </TouchableOpacity>
      <Image style={styles.tot} source={Images.tot} />
      <Image style={styles.dhan} source={Images.dhan} />
      <Image style={styles.redbull} source={Images.redbull} /> */}
      <ScrollView>
        <View style={styles.menuHeader}>

        <Text style={styles.txt}>COFE MARKET </Text>
        </View>

        <View style={styles.x}>
          {renderData()}
        </View>
      </ScrollView>
    </View>

  )
}

export default home

const styles = StyleSheet.create({
  // doretos: {
  //   width: 150,
  //   height: 100,
  //   marginTop: 33,
  //   marginLeft: 210
  // },



  // drenk: {
  //   width: 150,
  //   height: 100,
  //   marginTop: 33,
  //   marginLeft: 210,


  // },
  // siiiii: {
  //   width: 150,
  //   height: 100,
  //   marginTop: 33,
  //   marginLeft: 210,

  // },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',

  },

  valConatiner: {
    flexDirection: 'row',
borderBottomWidth:1 },
  valImg: {
    flexDirection: 'row',
    width: 150,
    height: 200,
    marginTop: 10
  
  },
  x: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  menuHeader:{
    backgroundColor:'gren '
  },
  txt:{
    textAlign:'center',
    fontSize:35,
    borderBottomWidth: 5
  }
})





