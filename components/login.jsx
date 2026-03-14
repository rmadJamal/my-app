import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const LoginComponents = ({ userName, setuserName, pass, setpass }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="اسم المستخدم "
                value={userName}
                onChangeText={setuserName}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="كلمة المرور"
                value={pass}
                onChangeText={setpass}
                secureTextEntry // لإخفاء كلمة المرور
            />
        </View>
    )
}

export default LoginComponents

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