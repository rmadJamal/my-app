import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Images} from "@/assets/images/Images"

const ContactItems = (props : any) => {
    return (
        <View>
            <View style={styles.contactContainer}>
                <Image source={props.img} style={styles.img}/>
                <Text>{props.name}</Text>
            </View>
        </View>
    )
}

export default ContactItems

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})