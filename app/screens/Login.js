import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert, Text,View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Item from '../components/item';
import { API_SERVER_URL } from '../app_config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceSize = Dimensions.get("window");

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const doLogin = function(){
        setIsLoading(true);
        console.log(email);
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        fetch(API_SERVER_URL + "auth/login", {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(data => {    
          setIsLoading(false);
        if(data.success == true){
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
            navigation.push('Main');
        }else{
          setIsLoading(false);
            Alert.alert(
            "Login Failed!",
            "Email or Password don't match.",
            [
                { text: 'OK', onPress: () => {}}
            ]);
        }
        })
        .catch(err => {
        console.log("Login API error", err);
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
              <Text style={styles.txt_login}>Login</Text>
              <Text style={styles.txt_desc}>Please sign in to continue</Text>
              <View style={styles.item_email}>
                <Item icon="mail-outline"  cplaceholder="EMAIL" value={email} onChangeText={text=>setEmail(text)}/>
              </View>
              <View style={styles.item_email}>
                <Item icon="lock-outline"  cplaceholder="PASSWORD" secureTextEntry={true} forgot={true} value={password} onChangeText={text=>setPassword(text)}/> 
              </View>
              <View style={styles.btn_wrapper}>
                  <TouchableOpacity onPress={doLogin} activeOpacity={0.8}>
                    <View
                        style={styles.login_btn}>
                        <Text
                          style={styles.login_btn_text}>
                          LOGIN                
                        </Text>
                        <Ionicons name="md-arrow-forward" size={32} color="white"/>
                    </View>
                  </TouchableOpacity>
              </View>
              <View style={styles.bottom_wrapper}>
                <Text>
                    Don't have an account?
                </Text>         
                <TouchableOpacity onPress={() => navigation.push('Register')}>
                  <Text style={styles.signup_btn_text}>
                    Sign up
                  </Text>
                </TouchableOpacity>         
              </View>       
            </View>
        </ScrollView> 
        {
        isLoading && (
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
      height: deviceSize.height,
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
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 30,
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
      bottom: 0,
      left: 0,
      flexDirection: 'row',
      width: deviceSize.width,
      textAlign: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    signup_btn_text: {
      fontSize: 16,
      color: '#fca941',
      fontWeight: 'bold',
      marginLeft: 10
    }
  });
  

export default LoginScreen;