import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, View, Animated, Dimensions } from 'react-native'
import { Images } from '@/assets/images/Images'
import { useNavigation } from 'expo-router'

const { width, height } = Dimensions.get('window');

const Index = () => {
    const nav = useNavigation()
    
    // إعدادات الحركة (البداية من 0)
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    const scaleAnim = useRef(new Animated.Value(0.5)).current; 

    useEffect(() => {
        // تشغيل الحركة عند فتح الصفحة
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            })
        ]).start();

        // الانتقال بعد 3 ثوانٍ
        const timer = setTimeout(() => {
            nav.navigate("home")
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
            }}>
                <Image source={Images.cofe} style={styles.cofe} resizeMode="contain" />
            </Animated.View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e7d32', // لون الخلفية يطابق الـ Header ليكون الانتقال ناعماً
        justifyContent: 'center',
        alignItems: 'center',
    },
    cofe: {
        width: width * 0.8, // عرض الصورة 80% من عرض الشاشة لضمان التناسق
        height: width * 0.8,
    }
})