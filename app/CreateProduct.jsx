import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import { createProduct } from '../constants/api';

const CreateProductPage = () => {
    const router = useRouter();
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [ImageUrl, setImageUrl] = useState('');

    const handleSave = async () => {
        if (!Name || !Price || !ImageUrl) {
            alert("خطأ \n يرجى ملء جميع الحقول");
            return;
        }

        const productData = { Name, Price, Image: ImageUrl };

        try {
            const res = await createProduct(productData);
            console.log("res", res);

            // Check if the response contains the expected _id from the server
            if (res && res._id) {
                alert(`تم بنجاح \n تم إضافة ${res.Name} بنجاح!`);
                router.replace('/');
            } else {
                alert("فشل \n فشل في إنشاء المنتج. حاول مرة أخرى.");
            }
        } catch (error) {
            console.error(error);
            alert("خطأ في الاتصال \n تعذر الاتصال بالخادم.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>إنشاء منتج جديد</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>اسم المنتج</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="اسم المنتج"
                        value={Name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>السعر ($)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={Price}
                        onChangeText={setPrice}
                    />

                    <Text style={styles.label}>رابط الصورة (URL)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://example.com/image.png"
                        autoCapitalize="none"
                        value={ImageUrl}
                        onChangeText={setImageUrl}
                    />

                    <Text style={styles.label}>معاينة الصورة:</Text>
                    <View style={styles.imagePreviewContainer}>
                        {ImageUrl ? (
                            <Image
                                source={{ uri: ImageUrl }}
                                style={styles.previewImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={styles.placeholderText}>لا يوجد صورة لعرضها</Text>
                        )}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>إضافة المنتج</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    imagePreviewContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        color: '#999',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateProductPage;