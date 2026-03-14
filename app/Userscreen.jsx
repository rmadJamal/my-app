import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import AppContext from '../store/AppContext';
import { useRouter } from 'expo-router';
import { UpdateUser } from '../constants/api'

const UserScreen = () => {
  const { setuser, user } = useContext(AppContext);
  const nav = useRouter();

  // استخراج البيانات الأولية
  const userData = user?.user || {};

  // حالات التحكم في التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const goToHomePage = () => nav.push('/home');

  const logout = () => setuser(null);

  const handleSave = async () => {
    // هنا يمكنك إضافة منطق تحديث البيانات في الـ API أو الـ Context
    setIsEditing(false);
    const body = {
      "_id": formData._id,
      "UserUpdate": {
        ...formData
      }
    }
    const savedData = await UpdateUser(body)
    console.log("Saved Data:", savedData);
    setFormData(savedData?.newUser || {})

  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>

          {/* صورة البروفايل (أول حرف من الاسم) */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>
              {formData.firstName?.[0]?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.nameHeader}>{formData.firstName} {formData.lastName}</Text>
          <Text style={styles.usernameHeader}>@{formData.userName}</Text>

          <View style={styles.divider} />

          {/* الحقول */}
          <View style={styles.infoSection}>
            <Field label="First Name" value={formData.firstName} onChangeText={(val) => setFormData({ ...formData, firstName: val })} isEditing={isEditing} />
            <Field label="Last Name" value={formData.lastName} onChangeText={(val) => setFormData({ ...formData, lastName: val })} isEditing={isEditing} />
            <Field label="Username" value={formData.userName} onChangeText={(val) => setFormData({ ...formData, userName: val })} isEditing={isEditing} />
            <Field label="Password" value={formData.pass} onChangeText={(val) => setFormData({ ...formData, pass: val })} isEditing={isEditing} secureTextEntry />
          </View>

          {/* الأزرار التفاعلية */}
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <TouchableOpacity onPress={handleSave} style={[styles.btn, styles.saveBtn]}>
                <Text style={styles.btnText}>Save Changes</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.btn, styles.editBtn]}>
                <Text style={styles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={goToHomePage} style={[styles.btn, styles.homeBtn]}>
              <Text style={styles.btnTextWhite}>Home Page</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout} style={styles.logoutLink}>
              <Text style={styles.logoutLinkText}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

// مكون فرعي للحقول لتقليل تكرار الكود
const Field = ({ label, value, isEditing, onChangeText, secureTextEntry }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <TextInput
        style={styles.inputActive}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    ) : (
      <Text style={styles.valueText}>{secureTextEntry ? '••••••••' : value}</Text>
    )}
  </View>
);

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // خلفية داكنة فخمة
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#eee',
  },
  imageText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  nameHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  usernameHeader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  infoSection: {
    width: '100%',
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    paddingVertical: 5,
  },
  inputActive: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
    color: '#000',
    paddingVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  editBtn: {
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  saveBtn: {
    backgroundColor: '#2ecc71',
  },
  homeBtn: {
    backgroundColor: '#6200ee',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6200ee',
  },
  btnTextWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  logoutLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  logoutLinkText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: 16,
  },
});