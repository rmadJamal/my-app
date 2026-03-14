import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import LoginComponents from '../components/login';
import Signup from '../components/signup';
import { login_api, signu_api } from '../constants/api'
import AppContext from '../store/AppContext'
import Userscreen from './Userscreen';

const Login = () => {
  const { user, setuser } = useContext(AppContext)

  const [form, setForm] = useState('login');
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [pass, setpass] = useState('');

  const handleAction = () => {

  };

  const swlitchLogin = () => {
    if (form == 'login') {
      setForm('signup')
    }
    else { setForm("login") }
  }

  const handlPress = () => {
    const body = {
      email,
      userName,
      pass,
    }
    if (form == "login") {
      LoginApi(body)
    }
    else {
      SignupApi(body)
    }
  }

  const LoginApi = async (body) => {
    const response = await login_api(body);
    console.log(response);
    if (response?.success) {
      alert(response.message)
      setuser(response.user)
    } else {
      alert(JSON.stringify(response))
    }
  }

  const SignupApi = async (body) => {
    const response = await signu_api(body);
    console.log(response);
    if (response?.success) {
      alert(response.message)
      setuser(response.user)
    } else {
      alert(JSON.stringify(response))
    }
  }

  return (
    // KeyboardAvoidingView تمنع الكيبورد من غلق الخانات عند الكتابة
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {user && user?.firstName ?
        <Userscreen user={user} /> :

        <View style={styles.card}>
          <Text style={styles.title}>{'RMAD MODS'}</Text>
          <Text style={styles.title}>
            {
              form == "login" ?
                'log in' :
                'حساب جديد'
            }
          </Text>


          (
          <>
            <LoginComponents
              userName={userName}
              setuserName={setuserName}
              pass={pass}
              setpass={setpass}
            />
            {

              form == "signup" &&
              <Signup
                email={email}
                setEmail={setEmail}
              />
            }
          </>
          )
          <TouchableOpacity style={styles.button} onPress={handlPress}>
            <Text style={styles.buttonText}>
              {form == "login" ?
                '😁تسجيل الدخول'
                : 'إنشاء حساب'
              }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={swlitchLogin} style={styles.switchBtn}>
            <Text style={styles.switchText}>
              {form == "login" ?
                'ليس لديك حساب؟ سجل الآن' :
                'لديك حساب بالفعل؟ ادخل'
              }
            </Text>
          </TouchableOpacity>
        </View>
      } 
    </KeyboardAvoidingView>
  );
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c48a9ff',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#121212ff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#2651d3ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#083ce9ff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4c0db2ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#0d29b7ff',
    fontSize: 14,
  },
});