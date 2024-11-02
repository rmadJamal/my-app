import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from '@/assets/images/Images'
import { useNavigation } from 'expo-router'

const index = () => {
    const nav = useNavigation()
    setTimeout(() => {
        nav.navigate("home")

    }, 2 * 1000)
    return (
        <View>
            {/* <Pressable onPress={() => {
                    nav.navigate("home")

            }}>
                <Text>go to home</Text>
            </Pressable> */}
            <Image source={Images.cofe} style={styles.cofe} />



        </View>
    )
}

export default index

const styles = StyleSheet.create({
    cofe: {
        width: 440,
        height: 440,
        marginTop: 66,
    }
})



