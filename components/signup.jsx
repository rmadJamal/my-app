import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-web'

const Signup = ({ email, setEmail }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="البريد الالكتروني"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffffff',
        borderWidth: 1,
        borderColor: '#1e0b72ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        textAlign: 'right', // ليدعم اللغة العربية
    },
})