import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

const Example = () => {
    return (
        <View style={styles.rmad}>
            <View style={styles.rmad}>
                <Text style={styles.text}>rmad</Text>
                <Text style={styles.myFont}>-</Text>
                <Text style={styles.plys}>+</Text>
                <Text>ajksbdkhasvbd</Text>
            </View>
            <View>
            </View>
        </View>

    )
}

export default Example

const styles = StyleSheet.create({
    rmad: {
        flex: 1,
        backgroundColor: "white",
    },


    text: {
        fontSize: 30,
        marginTop: -320,
        marginLeft: 150,

    },


    myFont: {
        fontSize: 90,
    },

    plys: {
        fontSize: 90,
        marginLeft: 310,
        //  marginBottom:120,

    }

})



