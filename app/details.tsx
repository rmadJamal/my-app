import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router' // تأكد من استيراد router هنا
import AppContext from '@/store/AppContext'

const Details = () => {
  const data = useLocalSearchParams()
  const [amount, setAmount] = useState(1);
  const { cart, setCart } = useContext(AppContext)

  const add = () => setAmount(amount + 1)
  const minus = () => amount > 1 ? setAmount(amount - 1) : setAmount(1)

  // الدالة المعدلة التي تقوم بالإضافة ثم الانتقال
  const addtocart = () => {
    const existingProductIndex = cart.findIndex((item) => item.Name === data.Name);

    if (existingProductIndex > -1) {
      let newCart = [...cart];
      newCart[existingProductIndex].amount += amount;
      setCart(newCart);
    } else {
      const productToAdd = { ...data, amount: amount };
      setCart([...cart, productToAdd]);
    }

    // السطر السحري: ينقلك لصفحة السلة فوراً
    router.push('/Cart'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: data.Image }}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data.Name}</Text>
          <Text style={styles.price}>{data.Price} ₪</Text>

          <View style={styles.divider} />

          <View style={styles.quantitySection}>
            <Text style={styles.label}>الكمية</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={add}><Text style={styles.plus}>+</Text></TouchableOpacity>
              <Text style={styles.namper}>{amount}</Text>
              <TouchableOpacity onPress={minus}><Text style={styles.hat}>-</Text></TouchableOpacity>
            </View>
          </View>

          {/* زر الإضافة الذي يستدعي الدالة المعدلة */}
          <TouchableOpacity 
            onPress={addtocart} 
            style={styles.addButton} 
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Details;

// ... (نفس الـ styles السابقة)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  card: { backgroundColor: '#fff', flex: 1 },
  imageContainer: { width: '100%', height: 400, backgroundColor: '#eee' },
  image: { width: '100%', height: '100%' },
  infoContainer: { padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  price: { fontSize: 22, color: '#2ecc71', fontWeight: '600', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  label: { fontSize: 16, fontWeight: '500', color: '#666', marginBottom: 10 },
  quantitySection: { marginBottom: 30 },
  addButton: { backgroundColor: '#000', paddingVertical: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 5, marginTop: 20 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  plus: { color: '#2e7d32', fontSize: 40 },
  namper: { color: '#333', fontSize: 35, fontWeight: 'bold' },
  hat: { color: '#c0392b', fontSize: 50 },
  quantityContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' },
})