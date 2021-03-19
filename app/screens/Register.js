import * as React from 'react';
import { useState } from 'react';
import {ActivityIndicator, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert, Text,View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Item from '../components/item';
import { API_SERVER_URL } from '../app_config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceSize = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
    const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [isLoadng, setIsLoading] = useState(false);


  const doSignup = function(){
    setIsLoading(true);
    var formData = new FormData();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("user_name", username);
    console.log(email);
    fetch(API_SERVER_URL + "auth/register", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        setIsLoading(false);
        if(data.success == true){
          console.log("Register API success", data);
          try {
            AsyncStorage.setItem(
              'token',
              data.data.token
            );
            AsyncStorage.setItem(
              'user',
              JSON.stringify(data.data.user)
            );
          } catch (error) {          
          }
          navigation.push('Profile');
        }else{
          Alert.alert(
            "Signup Failed!",
            JSON.stringify(data.error),
            [
              { text: 'OK', onPress: () => {}}
            ]);
        }        
    })
    .catch(err => {
      setIsLoading(false);
        console.log("Register API error", err);  
        Alert.alert(
          "Login Failed!",
          "Please check Network or Wifi.",
          [
          { text: 'OK', onPress: () => {}}
          ]);    
    });
  }

  return (
    <View>
    <ScrollView>
    <View style={styles.container}>
       <Image source={require('../assets/images/top.png')} style={styles.top}/>
       <View style={styles.header}>
            <TouchableOpacity style={styles.back_btn} onPress={() => navigation.push('Login')}>
                <Ionicons name="md-arrow-back" size={32} color="grey"/>
            </TouchableOpacity>
       </View>
       
       <Text style={styles.txt_login}>Create Account</Text>
       <View style={styles.item_email}>
        <Item icon="person-outline" cplaceholder="FULL NAME" value={fullname} onChangeText={text=>setFullName(text)}/>
       </View>
       <View style={styles.item_email}>
        <Item icon="person-outline"  cplaceholder="USERNAME" value={username} onChangeText={text=>setUsername(text)}/>
       </View>
       <View style={styles.item_email}>
        <Item icon="mail-outline" cplaceholder="EMAIL" value={email} onChangeText={text=>setEmail(text)}/> 
       </View>
       <View style={styles.item_email}>
        <Item icon="lock-outline" cplaceholder="PASSWORD" secureTextEntry={true} value={password} onChangeText={text=>setPassword(text)}/>
       </View>
       <View style={styles.item_email}> 
        <Item icon="lock-outline"  cplaceholder="CONFIRMA PASSWORD" secureTextEntry={true} value={confirmPassword} onChangeText={text=>setConfirmPassword(text)}/> 
       </View>
       <View style={styles.item_email}>
        <Item icon="phone-iphone" cplaceholder="MOBILE" value={mobile} onChangeText={text=>setMobile(text)} keyboardType="phone-pad"/> 
       </View>
       <View style={styles.btn_wrapper}>
          <TouchableOpacity onPress={doSignup}>
            <View
                style={styles.login_btn}>
                <Text
                  style={styles.login_btn_text}>
                  SIGN UP                
                </Text>
                <Ionicons name="md-arrow-forward" size={32} color="white"/>
            </View>
          </TouchableOpacity>
       </View>
       <View style={styles.bottom_wrapper}>
         <Text>
          Already have an account?
         </Text>         
        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={styles.signup_btn_text}>
            Sign in
          </Text>
        </TouchableOpacity>         
       </View>       
    </View>
    </ScrollView>
    {
        isLoadng && (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" color="black"/>  
            </View> 
          )
        } 
      </View> 
  );
}

const styles = StyleSheet.create({
    loading_container: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      width: deviceSize.width,
      height: deviceSize.height,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1000
  },
    container: {
      justifyContent: 'center',
      padding: 20,
      position: 'relative'
    },
    top: {
      width: 99 * 1.3,
      height: 79 * 1.3,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    txt_login: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10
    },
    txt_desc: {
      fontSize: 15,
      color: '#a8aaa9'
    },
    item_email: {
      marginTop: 20
    },
  
    btn_wrapper: {
      alignItems: 'flex-end',
      marginTop: 10,
      marginBottom: 50
    },
  
    login_btn: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 40,
      alignItems: 'center',
      marginTop: 30,
      flexDirection: 'row',
      backgroundColor: '#fda039'
    },
  
    login_btn_text: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
      marginRight: 10
    },
    bottom_wrapper: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom:0,
      left: 0,
      flexDirection: 'row',
      width: deviceSize.width,
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    signup_btn_text: {
      fontSize: 16,
      color: '#fca941',
      fontWeight: 'bold',
      marginLeft: 10
    },
  
    header: {
       padding: 10,
       backgroundColor: 'transparent'
    },
    back_btn: {
  
    }
});
  

export default RegisterScreen;