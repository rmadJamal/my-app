import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


const Quantity = () => {
    const [quantity, setQuantity] = useState(1);

    const add = () => {
        setQuantity(quantity + 1)
    }
    const minus = () => {
        if (quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
        }
    }

    return (
        <View>
            <View style={styles.quantityContainer}>
                <Text style={styles.plus} onPress={add}>+</Text>
                <Text style={styles.namper}>{quantity}</Text>
                <Text style={styles.hat} onPress={minus}>-</Text>
            </View>
        </View>
    )
}

export default Quantity

const styles = StyleSheet.create({
    plus: {
        color: 'red',
        fontSize: 40,
    },

    namper: {
        color: 'red',
        fontSize: 40,
    },

    hat: {
        color: 'red',
        fontSize: 50,
    },

    quantityContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent:'space-around',
        marginRight:50,
    },
})

