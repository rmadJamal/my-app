import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native';
import AppContext from '@/store/AppContext';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Payment = () => {
  const { cart, setCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // حساب الإجمالي
  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.Price) * item.amount), 0);

  const handlePayNow = () => {
    setLoading(true);

    // محاكاة عملية الدفع (Simulation)
    setTimeout(() => {
      setLoading(false);
      alert(
        "تمت العملية بنجاح! 🎉\n شكراً لشرائك من COFE MARKET. طلبك قيد التحضير الآن."
      );
      setCart([]);
      router.replace('/');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الدفع والتحصيل</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>المبلغ الإجمالي للدفع:</Text>
          <Text style={styles.summaryAmount}>{totalPrice.toFixed(2)} ₪</Text>
        </View>

        <Text style={styles.sectionTitle}>معلومات البطاقة</Text>

        <View style={styles.inputGroup}>
          <TextInput placeholder="رقم البطاقة" style={styles.input} keyboardType="numeric" />
          <View style={styles.row}>
            <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1, marginRight: 10 }]} keyboardType="numeric" />
            <TextInput placeholder="CVV" style={[styles.input, { flex: 1 }]} keyboardType="numeric" secureTextEntry />
          </View>
          <TextInput placeholder="الاسم على البطاقة" style={styles.input} />
        </View>

        <TouchableOpacity
          style={[styles.payBtn, loading && { backgroundColor: '#ccc' }]}
          onPress={handlePayNow}
          disabled={loading}
        >
          <MaterialCommunityIcons name="shield-check" size={24} color="white" />
          <Text style={styles.payBtnText}>
            {loading ? "جاري المعالجة..." : `ادفع الآن ${totalPrice.toFixed(2)} ₪`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#fff', alignItems: 'center', elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2e7d32' },
  content: { padding: 20 },
  summaryCard: {
    backgroundColor: '#2e7d32',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30
  },
  summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
  summaryAmount: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'left' },
  inputGroup: { marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  row: { flexDirection: 'row', marginBottom: 15 },
  payBtn: {
    backgroundColor: '#2e7d32',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  payBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});