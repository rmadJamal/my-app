import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import ContactItems from './ContactItems'
import { Images } from '@/assets/images/Images'
import { people } from './Data/Data'


const Whatsapp = () => {
    const renderChat = () => {
        const cards = people.map((pevson) => {
            return (
                <ContactItems name={pevson.name} img={pevson.img} />
            )
        })
        return cards
    }



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text}>WhaApp</Text>



            </View>
            {/* <TextInput placeholder="Sereh" style={styles.txtInput} />
        <ContactItems img={Images.camera} name={"Rmad"} />
        <ContactItems name={"Mohammed"} />
        <ContactItems name={"Ali"} /> */}
            {renderChat()}
        </View>
    )
}

export default Whatsapp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    headerContainer: {
        backgroundColor: 'green',
        marginTop: 4,
        height: 58,
        flexDirection: 'row',
        justifyContent: 'space-between',


    },

    text: {
        fontSize: 25,
        marginTop: 15
    },



    img: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginTop: 20,

    },


    imgContainer: {
        flexDirection: "row",
    },

    chat: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 10,
    },
    time1: {
        marginLeft: 210
    },
    time2: {
        marginLeft: 210
    },

    time3: {
        marginLeft: 240
    },
    time4: {
        marginLeft: 177
    },
    time5: {
        marginLeft: 213
    },
    time6: {
        marginLeft: 240
    },

    txtInput: {
        borderWidth: 1,
    },
})
