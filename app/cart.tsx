import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import AppContext from '@/store/AppContext';
import { router, useRouter } from 'expo-router';

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const router = useRouter()
  // حساب السعر الإجمالي
  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.Price) * item.amount), 0);

  const removeItem = (name) => {
    const filteredCart = cart.filter(item => item.Name !== name);
    setCart(filteredCart);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.Image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.Name}</Text>
        <Text style={styles.itemPrice}>{item.Price} ₪ × {item.amount}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.Name)} style={styles.removeBtn}>
        <Text style={styles.removeText}>إزالة</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>سلة المشتريات</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>السلة فارغة حالياً ☕</Text>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.shopBtn}>
            <Text style={styles.shopBtnText}>اذهب للتسوق</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listPadding}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>الإجمالي:</Text>
              <Text style={styles.totalValue}>{totalPrice.toFixed(2)} ₪</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/payment')}
              style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )
      }
    </SafeAreaView >
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  itemImage: { width: 70, height: 70, borderRadius: 10 },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#2e7d32', marginTop: 5 },
  removeBtn: { padding: 8 },
  removeText: { color: '#e74c3c', fontSize: 12 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fafafa' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
  checkoutBtn: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#999', marginBottom: 20 },
  shopBtn: { backgroundColor: '#2e7d32', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8 },
  shopBtnText: { color: '#fff', fontWeight: 'bold' }
});