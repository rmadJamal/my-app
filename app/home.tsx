import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions, StatusBar, Alert } from 'react-native'
import { useNavigation } from 'expo-router'
import { deleteProduct, findAllProduct } from '@/constants/api'
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const columnWidth = (width / 2) - 20;

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const nav = useNavigation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await findAllProduct({})
        console.log(response);
        setProducts(response.data || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDeleteProduct = async (id) => {
    // إظهار نافذة التأكيد للمتصفح
    const isConfirmed = confirm("هل أنت متأكد من حذف هذا المنتج؟");

    if (isConfirmed) {
      try {
        // 1. استدعاء السيرفر للحذف
        const result = await deleteProduct(id);

        // 2. تحديث الواجهة فقط في حال نجاح العملية
        if (result) {
          setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
        }
      } catch (error) {
        alert("حدث خطأ أثناء الحذف، يرجى المحاولة مرة أخرى.");
        console.error("Delete Error:", error);
      }
    }
  };

  const faildToload = "https://static.vecteezy.com/system/resources/previews/004/968/446/original/image-file-has-been-corrupted-concept-illustration-flat-design-eps10-modern-graphic-element-for-icon-landing-page-empty-state-ui-infographic-etc-vector.jpg"

  const renderData = () => {
    return products.map((val, index) => (
      <View key={val.id || index} style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, isEditing && styles.cardShake]}
          onPress={() => !isEditing && nav.navigate("details", val)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: val.Image || faildToload }} style={styles.valImg} resizeMode="cover" />
          <View style={styles.infoContainer}>
            <Text style={styles.nameTxt} numberOfLines={1}>{val.Name}</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.priceTxt}>{val.Price} ₪</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* زر الحذف - جعلته أكبر وبلون أحمر صريح ليبرز فوق أي صورة */}
        {isEditing && (
          <TouchableOpacity
            style={styles.deleteBadge}
            onPress={() => handleDeleteProduct(val._id)}
          >
            <AntDesign name="minuscircle" size={28} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
    ))
  }
  console.log(products);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>

        {/* Header أنيق بتصميم جديد */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>COFE <Text style={styles.brandSubtitle}>MARKET</Text></Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.iconButton} onPress={() => nav.navigate('login')}>
              <Feather name="user" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, isEditing ? styles.doneBtn : styles.editBtn]}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Feather name={isEditing ? "check" : "edit-2"} size={18} color="white" />
              <Text style={styles.btnText}>{isEditing ? "Done" : "Edit"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.createBtn]} onPress={() => nav.navigate('CreateProduct')}>
              <AntDesign name="plus" size={18} color="white" />
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Discover Our Menu</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#6F4E37" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.grid}>
            {renderData()}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCFB", // بيج فاتح جداً مريح للعين
  },
  header: {
    backgroundColor: '#3C2A21', // بني قهوة داكن وفخم
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4A373', // لون ذهبي/خشبي
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 15,
  },
  brandSubtitle: {
    color: 'white',
    fontWeight: '300',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    elevation: 2,
  },
  editBtn: { backgroundColor: '#6F4E37' }, // بني متوسط
  doneBtn: { backgroundColor: '#2D6A4F' }, // أخضر داكن للنجاح
  createBtn: { backgroundColor: '#D4A373' }, // لون التفاعل الأساسي
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3C2A21',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  cardContainer: {
    position: 'relative',
    marginTop: 15,
  },
  card: {
    backgroundColor: 'white',
    width: columnWidth,
    borderRadius: 25,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#3C2A21',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F1E3D3',
  },
  cardShake: {
    borderColor: '#FF3B30',
    borderWidth: 0.5,
  },
  deleteBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 100,
    // إضافة ظل قوي للزر ليظهر فوق أي صورة مهما كان لونها
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  valImg: {
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: 12,
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3C2A21',
    marginBottom: 6,
  },
  priceBadge: {
    backgroundColor: '#F1E3D3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceTxt: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6F4E37',
  },
  scrollPadding: {
    paddingBottom: 40,
  }
})